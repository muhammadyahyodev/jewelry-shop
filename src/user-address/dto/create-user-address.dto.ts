import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserAddressDto {
  @ApiProperty({ example: '3', description: 'user id' })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: '1', description: 'region id' })
  @IsNotEmpty()
  @IsNumber()
  readonly region_id: number;

  @ApiProperty({ example: '2', description: 'district id' })
  @IsNotEmpty()
  @IsNumber()
  readonly district_id: number;

  @ApiProperty({ example: 'abay street', description: 'street name' })
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @ApiProperty({ example: '31', description: 'house number' })
  @IsNotEmpty()
  @IsNumber()
  readonly house_number: number;

  @ApiProperty({ example: '123.453.123', description: 'location' })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty({ example: '', description: 'information of address' })
  @IsNotEmpty()
  @IsString()
  readonly info: string;
}
