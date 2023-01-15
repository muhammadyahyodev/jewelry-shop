import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './schemas/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    await this.findRoleByValue(createRoleDto.value);

    const newRole = await this.roleRepository.create(createRoleDto);
    return newRole;
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findByPk(id, {
      include: { all: true },
    });

    if (!role) {
      throw new NotFoundException('Role with this id not found');
    }

    return role;
  }

  async getRolesByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });

    if (!role) {
      throw new NotFoundException('Role with this value not found');
    }

    return role;
  }

  async findAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.findAll({ include: { all: true } });
    return roles;
  }

  async updateRoleById(id: number, userData: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.update(userData, {
      where: { id },
      returning: true,
    });
    if (!role) {
      throw new NotFoundException('Role with this ID not found or no updated');
    }
    return role[1][0];
  }

  async deleteRoleById(id: number): Promise<Object> {
    await this.findRoleById(id);
    await this.roleRepository.destroy({ where: { id } });

    return { message: `Role with id:${id} deleted` };
  }

  async findRoleByValue(value: string): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { value } });

    if (role) {
      throw new ForbiddenException('Already exitst');
    }
  }
}
