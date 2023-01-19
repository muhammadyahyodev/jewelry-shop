import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './schemas/booking.model';
import { JwtModule } from '@nestjs/jwt';
import { Cart } from '../cart/schemas/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, Cart]), JwtModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
