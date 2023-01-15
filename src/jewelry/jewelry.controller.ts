import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Jewelry } from './schemas/jewelry.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Jewelry')
@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}

  @ApiOperation({ summary: 'create new jewelry' })
  @ApiResponse({ status: 200, type: [Jewelry] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() createJewelryDto: CreateJewelryDto, @UploadedFile() photo) {
    return this.jewelryService.createNewJewelry(createJewelryDto, photo);
  }

  @ApiOperation({ summary: 'show all jewelries' })
  @ApiResponse({ status: 200, type: [Jewelry] })
  @Get()
  findAll() {
    return this.jewelryService.findAllJewelry();
  }

  @ApiOperation({ summary: 'show jewelry by id' })
  @ApiResponse({ status: 200, type: [Jewelry] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jewelryService.findOneJewelryById(+id);
  }

  @ApiOperation({ summary: 'update jewelry by id' })
  @ApiResponse({ status: 200, type: [Jewelry] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJewelryDto: UpdateJewelryDto) {
    return this.jewelryService.updateJewelryById(+id, updateJewelryDto);
  }

  @ApiOperation({ summary: 'delete jewelry by id' })
  @ApiResponse({ status: 200, type: [Jewelry] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jewelryService.deleteJewelryById(+id);
  }
}
