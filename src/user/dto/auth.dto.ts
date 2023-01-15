import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'coco@gmail.com', description: 'email user' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'password user auth' })
  @IsNotEmpty()
  @IsString()
  readonly password;
}
