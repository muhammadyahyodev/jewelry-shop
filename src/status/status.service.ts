import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './schemas/status.model';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusRepository: typeof Status,
  ) {}

  async createNewStatus(createStatusDto: CreateStatusDto): Promise<Status> {
    const { name } = createStatusDto;
    await this.findStatusByName(name);

    const status = await this.statusRepository.create(createStatusDto);

    return status;
  }

  async findAllStatuses(): Promise<Status[]> {
    const statuses = await this.statusRepository.findAll();
    return statuses;
  }

  async findOneStatusById(id: number): Promise<Status> {
    const status = await this.statusRepository.findByPk(id);
    if (!status) {
      throw new NotFoundException('Not found');
    }
    return status;
  }

  async updateStatusById(id: number, updateStatusDto: UpdateStatusDto) {
    await this.findOneStatusById(id);

    const status = await this.statusRepository.update(updateStatusDto, {
      where: { id },
      returning: true,
    });

    return status[1][0];
  }

  async deleteStatusById(id: number): Promise<Object> {
    await this.findOneStatusById(id);
    await this.statusRepository.destroy({ where: { id } });

    return { message: `Status with id:${id} deleted` };
  }

  async findStatusByName(name: string): Promise<void> {
    const status = await this.statusRepository.findOne({ where: { name } });
    if (status) {
      throw new ForbiddenException('Already exists');
    }
  }
}
