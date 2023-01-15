import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJewelryTypeDto {
  @ApiProperty({ example: 'ring', description: 'jewelry-type name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
