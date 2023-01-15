import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './schemas/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UserRole } from '../user-roles/schemas/user-role.model';
import { RolesModule } from '../roles/roles.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserRole]),
    JwtModule,
    RolesModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
