import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JewelryTypeService } from './jewelry-type.service';
import { CreateJewelryTypeDto } from './dto/create-jewelry-type.dto';
import { UpdateJewelryTypeDto } from './dto/update-jewelry-type.dto';
import { JewelryType } from './schemas/jewelry-type.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Jewelry-Type')
@Controller('jewelry-type')
export class JewelryTypeController {
  constructor(private readonly jewelryTypeService: JewelryTypeService) {}

  @ApiOperation({ summary: 'create jewelry-type' })
  @ApiResponse({ status: 200, type: [JewelryType] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createJewelryTypeDto: CreateJewelryTypeDto) {
    return this.jewelryTypeService.createJewelryType(createJewelryTypeDto);
  }

  @ApiOperation({ summary: 'show all jewelry-types' })
  @ApiResponse({ status: 200, type: [JewelryType] })
  @Get()
  findAll() {
    return this.jewelryTypeService.findAllJewelryTypes();
  }

  @ApiOperation({ summary: 'show jewelry-type by id' })
  @ApiResponse({ status: 200, type: [JewelryType] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jewelryTypeService.findOneJewelryTypeById(+id);
  }

  @ApiOperation({ summary: 'update jewelry-type by id' })
  @ApiResponse({ status: 200, type: [JewelryType] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateJewelryTypeDto: UpdateJewelryTypeDto,
  ) {
    return this.jewelryTypeService.updateJewelryTypeById(
      +id,
      updateJewelryTypeDto,
    );
  }

  @ApiOperation({ summary: 'delete jewelry-type by id' })
  @ApiResponse({ status: 200, type: [JewelryType] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jewelryTypeService.deleteJewleryTypeById(+id);
  }
}
