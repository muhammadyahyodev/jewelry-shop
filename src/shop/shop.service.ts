import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './schemas/shop.model';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop) private readonly shopRepository: typeof Shop,
  ) {}

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    const { name } = createShopDto;

    await this.findShopByName(name);

    const shop = await this.shopRepository.create(createShopDto);

    return shop;
  }

  async findAllShops(): Promise<Shop[]> {
    const shops = await this.shopRepository.findAll({ include: { all: true } });
    return shops;
  }

  async findOneShopById(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findByPk(id, {
      include: { all: true },
    });

    if (!shop) {
      throw new NotFoundException('Not found shop with this id');
    }

    return shop;
  }

  async updateOneShopById(
    id: number,
    updateShopDto: UpdateShopDto,
  ): Promise<Shop> {
    await this.findOneShopById(id);

    const updatedShop = await this.shopRepository.update(updateShopDto, {
      where: { id },
      returning: true,
    });

    return updatedShop[1][0];
  }

  async deleteShopById(id: number): Promise<Object> {
    await this.findOneShopById(id);
    await this.shopRepository.destroy({ where: { id } });

    return { message: `Shop with id:${id} deleted` };
  }

  async findShopByName(name: string): Promise<void> {
    const shop = await this.shopRepository.findOne({ where: { name } });
    if (shop) {
      throw new ForbiddenException('Already exists');
    }
  }
}
