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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { Role } from './schemas/role.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'show new role' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'show roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.rolesService.findAllRoles();
  }

  @ApiOperation({ summary: 'show role by id' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findRoleById(+id);
  }

  @ApiOperation({ summary: 'update role by id' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRoleById(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'delete role by id' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.deleteRoleById(+id);
  }
}
