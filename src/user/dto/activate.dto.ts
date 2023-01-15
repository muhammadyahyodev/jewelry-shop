import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateDto {
  @ApiProperty({ example: '1', description: 'user id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'false', description: 'value of activate' })
  @IsNotEmpty()
  @IsBoolean()
  value: boolean;
}
