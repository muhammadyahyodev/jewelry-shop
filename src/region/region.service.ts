import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './schemas/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionRepository: typeof Region,
  ) {}

  async createNewRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const { number } = createRegionDto;
    await this.findRegionByNumber(number);

    const region = await this.regionRepository.create(createRegionDto);

    return region;
  }

  async findAllRegions(): Promise<Region[]> {
    const regions = await this.regionRepository.findAll({
      include: { all: true },
    });
    return regions;
  }

  async findRegionById(id: number): Promise<Region> {
    const region = await this.regionRepository.findByPk(+id, {
      include: { all: true },
    });
    if (!region) {
      throw new NotFoundException('Not found');
    }
    return region;
  }

  async updateRegionById(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    await this.findRegionById(id);

    const region = await this.regionRepository.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0];
  }

  async deleteRegionById(id: number): Promise<Object> {
    await this.findRegionById(id);
    await this.regionRepository.destroy({ where: { id } });

    return { message: `Region with id:${id} deleted` };
  }

  async findRegionByNumber(number: string): Promise<void> {
    const region = await this.regionRepository.findOne({ where: { number } });
    if (region) {
      throw new ForbiddenException('Already exists');
    }
  }
}
