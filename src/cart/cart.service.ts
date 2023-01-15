import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
  ) {}

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart: Cart = await this.cartRepository.create(createCartDto);

    return cart;
  }

  async findAllCarts(): Promise<Cart[]> {
    const carts: Cart[] = await this.cartRepository.findAll({
      include: { all: true },
    });

    return carts;
  }

  async findCartById(id: number): Promise<Cart> {
    const cart: Cart = await this.cartRepository.findByPk(id, {
      include: { all: true },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with this id not found`);
    }

    return cart;
  }

  async updateCartById(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    await this.findCartById(id);

    const cart = await this.cartRepository.update(updateCartDto, {
      where: { id },
      returning: true,
    });

    return cart[1][0];
  }

  async deleteCartById(id: number): Promise<Object> {
    await this.findCartById(id);

    await this.cartRepository.destroy({ where: { id } });

    return `Cart with id:{id} deleted`;
  }
}
