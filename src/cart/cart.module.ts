import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './schemas/cart.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/schemas/user.model';
import { Jewelry } from '../jewelry/schemas/jewelry.model';
import { Booking } from '../booking/schemas/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Jewelry, User, Booking]),
    JwtModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
