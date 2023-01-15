import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './schemas/booking.model';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'create new booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @ApiOperation({ summary: 'show all bookings' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.bookingService.findAllBookings();
  }

  @ApiOperation({ summary: 'show booking by id' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findBookingById(+id);
  }

  @ApiOperation({ summary: 'update booking by id' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateBookingById(+id, updateBookingDto);
  }

  @ApiOperation({ summary: 'delete booking by id' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.deleteBookingByID(+id);
  }
}
