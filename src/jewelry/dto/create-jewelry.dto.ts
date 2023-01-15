import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJewelryDto {
  @ApiProperty({ example: 'ring', description: 'jewelry name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '221.13', description: 'jewelry price' })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: '', description: 'description to jewelry' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: '2', description: 'status id' })
  @IsNotEmpty()
  readonly status_id: number;

  @ApiProperty({ example: '2', description: 'detail id' })
  @IsNotEmpty()
  readonly detail_id: number;

  @ApiProperty({ example: '2', description: 'jewelry type id' })
  @IsNotEmpty()
  readonly jewelry_type_id: number;

  @ApiProperty({ example: '2', description: 'shop id' })
  @IsNotEmpty()
  readonly shop_id: number;

  @ApiProperty({ example: '2', description: 'brand id' })
  @IsNotEmpty()
  readonly brand_id: number;
}
