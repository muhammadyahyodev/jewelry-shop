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
import { DetailService } from './detail.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Detail } from './schemas/detail.model';

@ApiTags('Detail')
@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @ApiOperation({ summary: 'create new detail' })
  @ApiResponse({ status: 200, type: [Detail] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailService.createNewDetail(createDetailDto);
  }

  @ApiOperation({ summary: 'show all detail' })
  @ApiResponse({ status: 200, type: [Detail] })
  @Get()
  findAll() {
    return this.detailService.findAllDetails();
  }

  @ApiOperation({ summary: 'show detail by id' })
  @ApiResponse({ status: 200, type: [Detail] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailService.findOneDetailById(+id);
  }

  @ApiOperation({ summary: 'update detail by id' })
  @ApiResponse({ status: 200, type: [Detail] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailService.updateDetailById(+id, updateDetailDto);
  }

  @ApiOperation({ summary: 'delete detail by id' })
  @ApiResponse({ status: 200, type: [Detail] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailService.deleteDetailById(+id);
  }
}
