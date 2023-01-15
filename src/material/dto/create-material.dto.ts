import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ example: '14K', description: 'material name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '', description: 'description to material' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
