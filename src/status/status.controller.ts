import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Status } from './schemas/status.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'create new status' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  // @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createNewStatus(createStatusDto);
  }

  @ApiOperation({ summary: 'show all status' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  // @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.statusService.findAllStatuses();
  }

  @ApiOperation({ summary: 'show status by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOneStatusById(+id);
  }

  @ApiOperation({ summary: 'update status by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatusById(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'delete status by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.deleteStatusById(+id);
  }
}
