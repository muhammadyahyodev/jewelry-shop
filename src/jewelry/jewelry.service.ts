import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import { Jewelry } from './schemas/jewelry.model';

@Injectable()
export class JewelryService {
  constructor(
    @InjectModel(Jewelry) private readonly jewelryRepository: typeof Jewelry,
    private readonly fileService: FilesService,
  ) {}

  async createNewJewelry(
    createJewelryDto: CreateJewelryDto,
    photo: any,
  ): Promise<Jewelry> {
    const { status_id, detail_id, jewelry_type_id, shop_id, brand_id } =
      createJewelryDto;

    const fileName = await this.fileService.createFile(photo);

    const data = {
      ...createJewelryDto,
      status_id: Number(status_id),
      detail_id: Number(detail_id),
      jewelry_type_id: Number(jewelry_type_id),
      shop_id: Number(shop_id),
      brand_id: Number(brand_id),
    };

    const jewelry = await this.jewelryRepository.create({
      ...data,
      photo: fileName,
    });

    return jewelry;
  }

  async findAllJewelry(): Promise<Jewelry[]> {
    const jewelry = await this.jewelryRepository.findAll({
      include: { all: true },
    });

    return jewelry;
  }

  async findOneJewelryById(id: number): Promise<Jewelry> {
    const jewelry = await this.jewelryRepository.findByPk(id, {
      include: { all: true },
    });

    if (!jewelry) {
      throw new NotFoundException('Not found');
    }

    return jewelry;
  }

  async updateJewelryById(
    id: number,
    updateJewelryDto: UpdateJewelryDto,
  ): Promise<Jewelry> {
    await this.findOneJewelryById(id);

    const jewelry = await this.jewelryRepository.update(updateJewelryDto, {
      where: { id },
      returning: true,
    });

    return jewelry[1][0];
  }

  async deleteJewelryById(id: number): Promise<Object> {
    await this.findOneJewelryById(id);
    await this.jewelryRepository.destroy({ where: { id } });

    return { message: `Jewelry with id:${id} deleted` };
  }
}
