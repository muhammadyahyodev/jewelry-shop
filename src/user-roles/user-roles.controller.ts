import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Roles('CREATOR')
  @UseGuards(RolesGuard)
  @Get()
  getAllUserRoles() {
    return this.userRolesService.findAllUserWithRoles();
  }
}
