import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRewiewDto {
  @ApiProperty({ example: '2', description: 'rating' })
  @IsNotEmpty()
  @IsString()
  readonly rate: string;

  @ApiProperty({ example: 'Expensive', description: 'comment' })
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @ApiProperty({ example: '5', description: 'jewelry id' })
  @IsNotEmpty()
  @IsNumber()
  readonly jewelry_id: number;

  @ApiProperty({ example: '1', description: 'user id' })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}
