import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentMethod } from './schemas/payment_method.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Payment-Method')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'create new payment method' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.createPaymentMethod(
      createPaymentMethodDto,
    );
  }

  @ApiOperation({ summary: 'show all payment methods' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @Get()
  findAll() {
    return this.paymentMethodService.findAllPaymentMethods();
  }

  @ApiOperation({ summary: 'show payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findPaymentMethodById(+id);
  }

  @ApiOperation({ summary: 'update payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.updatePaymentMethodById(
      +id,
      updatePaymentMethodDto,
    );
  }

  @ApiOperation({ summary: 'delete payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.deletePaymentMethodById(+id);
  }
}
