import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './schemas/user-role.model';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../roles/schemas/role.model';
import { User } from '../user/schemas/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), JwtModule],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
