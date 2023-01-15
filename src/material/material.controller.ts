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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Material } from './schemas/material.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Material')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @ApiOperation({ summary: 'create new material' })
  @ApiResponse({ status: 200, type: [Material] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createNewMaterial(createMaterialDto);
  }

  @ApiOperation({ summary: 'show all materials' })
  @ApiResponse({ status: 200, type: [Material] })
  @Get()
  findAll() {
    return this.materialService.findAllMaterials();
  }

  @ApiOperation({ summary: 'show one material by id' })
  @ApiResponse({ status: 200, type: [Material] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOneMaterialById(+id);
  }

  @ApiOperation({ summary: 'update material by id' })
  @ApiResponse({ status: 200, type: [Material] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.updateMaterialById(+id, updateMaterialDto);
  }

  @ApiOperation({ summary: 'delete material by id' })
  @ApiResponse({ status: 200, type: [Material] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.deleteMaterialById(+id);
  }
}
