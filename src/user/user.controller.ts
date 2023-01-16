import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-customer.dto';
import { User } from './schemas/user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'signup user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('signup') // USER
  signupu(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signupUser(createUserDto, res);
  }

  @ApiOperation({ summary: 'signin user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('signin') // USER
  signin(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.signinUser(authDto, res);
  }

  @ApiOperation({ summary: 'signup admin' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('admin/signup')
  signupa(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signupAdmin(createUserDto, res);
  }

  @ApiOperation({ summary: 'signin admin' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('admin/signin')
  sign(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.signinUser(authDto, res);
  }

  @ApiOperation({ summary: 'logout user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.userService.logout(req, res);
  }

  @ApiOperation({ summary: 'get refresh token customer' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('refresh-token')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.userService.refreshToken(req, res);
  }

  @ApiOperation({ summary: 'show all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'show user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles('ADMIN', 'CREATOR')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @ApiOperation({ summary: 'activate user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }
}
