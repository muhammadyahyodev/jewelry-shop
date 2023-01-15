import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.model';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private readonly brandRepository: typeof Brand,
  ) {}

  async createNewBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const { name } = createBrandDto;

    await this.findBrandByName(name);

    const brand = await this.brandRepository.create(createBrandDto);

    return brand;
  }

  async findAllBrands(): Promise<Brand[]> {
    const brands = await this.brandRepository.findAll({
      include: { all: true },
    });
    return brands;
  }

  async findOneBrandById(id: number): Promise<Brand> {
    const brand: Brand = await this.brandRepository.findByPk(id, {
      include: { all: true },
    });
    if (!brand) {
      throw new NotFoundException('Not found');
    }
    return brand;
  }

  async updateBrandById(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    await this.findOneBrandById(id);

    const updatedBrand = await this.brandRepository.update(updateBrandDto, {
      where: { id },
      returning: true,
    });

    return updatedBrand[1][0];
  }

  async deleteBrandById(id: number): Promise<Object> {
    await this.findOneBrandById(id);
    await this.brandRepository.destroy({ where: { id } });

    return { message: `Brand with id:${id} deleted` };
  }

  async findBrandByName(name: string): Promise<void> {
    const brand: Brand = await this.brandRepository.findOne({
      where: { name },
    });
    if (brand) {
      throw new ForbiddenException('Already exists');
    }
  }
}
