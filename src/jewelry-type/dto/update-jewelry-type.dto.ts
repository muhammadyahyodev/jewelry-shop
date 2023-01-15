import { PartialType } from '@nestjs/swagger';
import { CreateJewelryTypeDto } from './create-jewelry-type.dto';

export class UpdateJewelryTypeDto extends PartialType(CreateJewelryTypeDto) {}
