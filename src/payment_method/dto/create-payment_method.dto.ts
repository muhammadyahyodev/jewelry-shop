import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Click', description: 'payment method' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '', description: 'description for payment method' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
