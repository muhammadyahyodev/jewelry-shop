import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ example: 'Starmix', description: 'shop name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '', description: 'shop location' })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 'starmix@gmail.com', description: 'shop contact' })
  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @ApiProperty({ example: 'images', description: 'shop photos' })
  @IsNotEmpty()
  @IsString()
  readonly photos: string;
}
