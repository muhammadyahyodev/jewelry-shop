import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../cart/schemas/cart.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './schemas/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingRepository: typeof Booking,
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { cart_id } = createBookingDto;

    const status = await this.cartRepository.findOne({
      where: { id: cart_id },
    });

    // if ((status.status_id = 3)) {
    //   throw new ForbiddenException('Time out');
    // }

    const booking = await this.bookingRepository.create(createBookingDto);

    return booking;
  }

  async findAllBookings(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.findAll({
      include: { all: true },
    });

    return bookings;
  }

  async findBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findByPk(id, {
      include: { all: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking with this id not found');
    }

    return booking;
  }

  async updateBookingById(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    await this.findBookingById(id);

    const booking = await this.bookingRepository.update(updateBookingDto, {
      where: { id },
      returning: true,
    });

    return booking[1][0];
  }

  async deleteBookingByID(id: number): Promise<Object> {
    await this.findBookingById(id);
    await this.bookingRepository.destroy({ where: { id } });

    return `Booking with id:${id} deleted`;
  }
}
