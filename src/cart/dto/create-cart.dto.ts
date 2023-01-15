import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '3', description: 'jewelry id' })
  @IsNotEmpty()
  @IsNumber()
  jewelry_id: number;

  @ApiProperty({ example: '3', description: 'user id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
