import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from './schemas/user.model';
import { v4 as uuidv4 } from 'uuid';
import { ActivateDto, AuthDto, CreateUserDto } from './dto';
import { UserRole } from '../user-roles/schemas/user-role.model';
import { MailService } from '../mail/mail.service';
import { JwtPayload, Tokens } from '../types';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/schemas/role.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserRole) private readonly userRoleRepository: typeof UserRole,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signupAdmin(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<Tokens> {
    const { email, password } = createUserDto;

    await this.findUserByEmail(email);

    const hashedPassword: string = await bcrypt.hash(password, 7);
    const uniqueKey: string = uuidv4();

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      activation_link: uniqueKey,
    });

    await this.mailService.sendUserConfirmation(user, user.activation_link);

    const role = await this.rolesService.getRolesByValue('CREATOR');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.is_active,
      user.is_bann,
      user.roles,
    );

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signupUser(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<Tokens> {
    const { email, password } = createUserDto;

    await this.findUserByEmail(email);

    const hashedPassword: string = await bcrypt.hash(password, 7);
    const uniqueKey: string = uuidv4();

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      activation_link: uniqueKey,
    });

    // SENDING MESSAGE TO USER EMAIL
    // await this.mailService.sendUserConfirmation(user, user.activation_link);

    const role = await this.rolesService.getRolesByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.is_active,
      user.is_bann,
      user.roles,
    );

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signinAdmin(authDto: AuthDto, res: Response): Promise<Tokens> {
    const { email } = authDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Condidate unauthorized');
    }

    const passwordMatches: boolean = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('User unauthorized');
    }

    const role = await this.rolesService.getRolesByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.is_active,
      user.is_bann,
      user.roles,
    );

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signinUser(authDto: AuthDto, res: Response): Promise<Tokens> {
    const { email } = authDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Condidate unauthorized');
    }

    const passwordMatches: boolean = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('User unauthorized');
    }

    const role = await this.rolesService.getRolesByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.is_active,
      user.is_bann,
      user.roles,
    );

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async logout(req: Request, res: Response): Promise<boolean> {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException('Condidate unauthorized');
    }

    const check: JwtPayload = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.userRepository.update(
      { refresh_token: null },
      {
        where: { id: check.sub },
        returning: true,
      },
    );

    if (!user[1][0]) {
      throw new ForbiddenException('You must login');
    }

    res.clearCookie('refresh_token');

    return true;
  }

  async refreshToken(req: Request, res: Response): Promise<Tokens> {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException('Condidate unauthorized');
    }

    const check: JwtPayload = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.userRepository.findByPk(check.sub);

    if (!user) {
      throw new ForbiddenException('Not found');
    }

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.is_active,
      user.is_bann,
      user.roles,
    );

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async activate(link: string): Promise<void> {
    await this.userRepository.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
  }

  async activatation(activateDto: ActivateDto): Promise<User> {
    const { value, user_id } = activateDto;

    const user = await this.userRepository.update(
      { is_bann: value },
      { where: { id: user_id, is_bann: !value }, returning: true },
    );

    if (!user) {
      throw new ForbiddenException('Already activated or deactivated');
    }

    return user[1][0];
  }

  async restriction(banedValue: ActivateDto): Promise<User> {
    const { value, user_id } = banedValue;

    const user = await this.userRepository.update(
      { is_active: value },
      { where: { id: user_id, is_active: !value }, returning: true },
    );

    if (!user) {
      throw new ForbiddenException('Already banned or revoked');
    }

    return user[1][0];
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });

    if (!user) {
      throw new NotFoundException('User with this id not found');
    }

    return user;
  }

  async deleteUserById(id: number): Promise<Object> {
    await this.findUserById(+id);
    await this.userRoleRepository.destroy({ where: { user_id: id } });
    await this.userRepository.destroy({ where: { id } });

    return { message: `Condidate with id:${id} deleted` };
  }

  private async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new ForbiddenException('Already exists');
    }
  }

  private async getTokens(
    user_id: number,
    email: string,
    is_active: boolean,
    is_bann: boolean,
    roles: Role[],
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: user_id,
      email,
      is_active,
      is_bann,
      roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 7);

    await this.userRepository.update(
      { refresh_token: hashedRefreshToken },
      { where: { id } },
    );
  }
}
