import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAddress } from './schemas/user-address.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserAddress]), JwtModule ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
