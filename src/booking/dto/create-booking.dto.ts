import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '2', description: 'cart id' })
  @IsNotEmpty()
  @IsNumber()
  readonly cart_id: number;

  @ApiProperty({ example: 'true', description: 'delievery' })
  @IsNotEmpty()
  @IsBoolean()
  readonly delivery: boolean;

  @ApiProperty({ example: '2', description: 'payment method id' })
  @IsNotEmpty()
  @IsNumber()
  readonly payment_method_id: number;
}
