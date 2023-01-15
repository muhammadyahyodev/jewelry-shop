import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ example: 'Idaho', description: 'district name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '43634634632314112', description: 'district number' })
  @IsNotEmpty()
  @IsString()
  district_number: string;

  @ApiProperty({ example: '1', description: 'region id' })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;
}
