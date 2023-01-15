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
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Shop } from './schemas/shop.model';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: 'create new shop' })
  @ApiResponse({ status: 200, type: [Shop] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.createShop(createShopDto);
  }

  @ApiOperation({ summary: 'show all shops' })
  @ApiResponse({ status: 200, type: [Shop] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.shopService.findAllShops();
  }

  @ApiOperation({ summary: 'show one shop by id' })
  @ApiResponse({ status: 200, type: [Shop] })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOneShopById(+id);
  }

  @ApiOperation({ summary: 'update one shop by id' })
  @ApiResponse({ status: 200, type: [Shop] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.updateOneShopById(+id, updateShopDto);
  }

  @ApiOperation({ summary: 'delete one shop by id' })
  @ApiResponse({ status: 200, type: [Shop] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.deleteShopById(+id);
  }
}
