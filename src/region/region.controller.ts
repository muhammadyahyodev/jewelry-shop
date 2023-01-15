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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Region } from './schemas/region.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'create new region' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createNewRegion(createRegionDto);
  }

  @ApiOperation({ summary: 'show all region' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get()
  findAll() {
    return this.regionService.findAllRegions();
  }

  @ApiOperation({ summary: 'show region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findRegionById(+id);
  }

  @ApiOperation({ summary: 'update region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.updateRegionById(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'delete region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.deleteRegionById(+id);
  }
}
