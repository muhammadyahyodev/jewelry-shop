import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-customer.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
