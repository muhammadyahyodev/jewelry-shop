import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './schemas/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtRepository: typeof District,
  ) {}

  async createDistrict(
    createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    const { name } = createDistrictDto;
    await this.findDistrictByName(name);

    const district: District = await this.districtRepository.create(
      createDistrictDto,
    );

    return district;
  }

  async findAll(): Promise<District[]> {
    const districts: District[] = await this.districtRepository.findAll({
      include: { all: true },
    });
    return districts;
  }

  async findOneDistrictById(id: number): Promise<District> {
    const district: District = await this.districtRepository.findByPk(id, {
      include: { all: true },
    });
    if (!district) {
      throw new HttpException('Not found ', HttpStatus.NOT_FOUND);
    }
    return district;
  }

  async updateDistrictById(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    await this.findOneDistrictById(id);

    const district = await this.districtRepository.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });

    return district[1][0];
  }

  async removeDistrictById(id: number): Promise<Number> {
    await this.findOneDistrictById(id);
    await this.districtRepository.destroy({ where: { id } });

    return id;
  }

  private async findDistrictByName(name: string): Promise<District> {
    const distriict: District = await this.districtRepository.findOne({
      where: { name },
    });
    if (distriict) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return distriict;
  }
}
