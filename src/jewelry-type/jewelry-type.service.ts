import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateJewelryTypeDto } from './dto/create-jewelry-type.dto';
import { UpdateJewelryTypeDto } from './dto/update-jewelry-type.dto';
import { JewelryType } from './schemas/jewelry-type.model';

@Injectable()
export class JewelryTypeService {
  constructor(
    @InjectModel(JewelryType)
    private readonly jewelryTypeRepository: typeof JewelryType,
  ) {}

  async createJewelryType(
    createJewelryTypeDto: CreateJewelryTypeDto,
  ): Promise<JewelryType> {
    const { name } = createJewelryTypeDto;

    await this.findOneJewelryTypeByName(name);

    const jewelryType = await this.jewelryTypeRepository.create(
      createJewelryTypeDto,
    );

    return jewelryType;
  }

  async findAllJewelryTypes(): Promise<JewelryType[]> {
    const jewelryTypes = await this.jewelryTypeRepository.findAll({
      include: { all: true },
    });
    return jewelryTypes;
  }

  async findOneJewelryTypeById(id: number): Promise<JewelryType> {
    const jewelryType = await this.jewelryTypeRepository.findByPk(id, {
      include: { all: true },
    });
    if (!jewelryType) {
      throw new NotFoundException('Not found');
    }
    return jewelryType;
  }

  async updateJewelryTypeById(
    id: number,
    updateJewelryTypeDto: UpdateJewelryTypeDto,
  ): Promise<JewelryType> {
    await this.findOneJewelryTypeById(id);

    const jewelryType = await this.jewelryTypeRepository.update(
      updateJewelryTypeDto,
      { where: { id }, returning: true },
    );

    return jewelryType[1][0];
  }

  async deleteJewleryTypeById(id: number): Promise<Object> {
    await this.deleteJewleryTypeById(id);
    await this.jewelryTypeRepository.destroy({ where: { id } });

    return { message: `Jewelry-type with id:${id} deleted` };
  }

  async findOneJewelryTypeByName(name: string): Promise<void> {
    const jewelryType = await this.jewelryTypeRepository.findOne({
      where: { name },
    });
    if (jewelryType) {
      throw new ForbiddenException('Already exists');
    }
  }
}
