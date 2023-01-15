import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetailDto {
  @ApiProperty({ example: '2.1', description: 'detail weight' })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @ApiProperty({ example: '583', description: 'detail gold content' })
  @IsNotEmpty()
  @IsString()
  readonly gold_content: string;

  @ApiProperty({ example: 'pink', description: 'detail color' })
  @IsNotEmpty()
  @IsString()
  readonly color: string;

  @ApiProperty({ example: '2', description: 'material id' })
  @IsNotEmpty()
  @IsNumber()
  readonly material_id: number;
}
