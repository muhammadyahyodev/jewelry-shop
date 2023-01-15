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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.model';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'create new brand' })
  @ApiResponse({ status: 200, type: [Brand] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createNewBrand(createBrandDto);
  }

  @ApiOperation({ summary: 'show all brands' })
  @ApiResponse({ status: 200, type: [Brand] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.brandService.findAllBrands();
  }

  @ApiOperation({ summary: 'show one brand by id' })
  @ApiResponse({ status: 200, type: [Brand] })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOneBrandById(+id);
  }

  @ApiOperation({ summary: 'update brand by id' })
  @ApiResponse({ status: 200, type: [Brand] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.updateBrandById(+id, updateBrandDto);
  }

  @ApiOperation({ summary: 'delete brand by id' })
  @ApiResponse({ status: 200, type: [Brand] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.deleteBrandById(+id);
  }
}
