import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'the value of the role' })
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({ example: 'this user', description: 'description of the role' })
  @IsOptional()
  @IsString()
  readonly description: string;
}
