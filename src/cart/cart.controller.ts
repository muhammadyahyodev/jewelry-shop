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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/cart.model';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'create new cart' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @ApiOperation({ summary: 'show all carts' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.cartService.findAllCarts();
  }

  @ApiOperation({ summary: 'show cart by id' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  // user faqat o'zini cart'ini ko'ra olishi mumkin
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findCartById(+id);
  }

  @ApiOperation({ summary: 'update cart by id' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCartById(+id, updateCartDto);
  }

  @ApiOperation({ summary: 'delete cart by id' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCartById(+id);
  }
}
