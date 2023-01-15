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
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserAddress } from './schemas/user-address.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { UserGuard } from '../guards/user.guard';

@ApiTags('User-Address')
@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @ApiOperation({ summary: 'create user address' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @ApiBearerAuth()
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressService.createUserAddress(createUserAddressDto);
  }

  @ApiOperation({ summary: 'show all user addresses' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userAddressService.findAllUserAddresses();
  }

  @ApiOperation({ summary: 'show one address by id' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  // BUNGA DOSTUP HAMMA ADMIN VA SHU USER'NING O'ZI
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.findUserAddressById(+id);
  }

  @ApiOperation({ summary: 'update user address by id' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @UseGuards(UserGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.updateUserAddressById(
      +id,
      updateUserAddressDto,
    );
  }

  @ApiOperation({ summary: 'delete user address by id' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.deleteUserAddresById(+id);
  }
}
