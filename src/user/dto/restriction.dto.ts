import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class Restriction {
  @ApiProperty({ example: '1', description: 'user id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'false', description: 'value of restriction' })
  @IsNotEmpty()
  @IsBoolean()
  value: boolean;
}
