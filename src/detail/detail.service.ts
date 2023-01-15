import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Detail } from './schemas/detail.model';

@Injectable()
export class DetailService {
  constructor(
    @InjectModel(Detail) private readonly detailRepository: typeof Detail,
  ) {}

  async createNewDetail(createDetailDto: CreateDetailDto): Promise<Detail> {
    const detail: Detail = await this.detailRepository.create(createDetailDto);
    return detail;
  }

  async findAllDetails(): Promise<Detail[]> {
    const details: Detail[] = await this.detailRepository.findAll({
      include: { all: true },
    });
    return details;
  }

  async findOneDetailById(id: number): Promise<Detail> {
    const detail: Detail = await this.detailRepository.findByPk(id, {
      include: { all: true },
    });
    if (!detail) {
      throw new NotFoundException('Not found');
    }
    return detail;
  }

  async updateDetailById(
    id: number,
    updateDetailDto: UpdateDetailDto,
  ): Promise<Detail> {
    await this.findOneDetailById(id);

    const detail = await this.detailRepository.update(updateDetailDto, {
      where: { id },
      returning: true,
    });

    return detail[1][0];
  }

  async deleteDetailById(id: number): Promise<Object> {
    await this.findOneDetailById(id);
    await this.detailRepository.destroy({ where: { id } });

    return { message: `Detail with id:${id} deleted` };
  }
}
