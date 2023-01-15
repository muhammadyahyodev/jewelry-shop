import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './schemas/material.model';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material) private readonly materialRepository: typeof Material,
  ) {}

  async createNewMaterial(
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const { name } = createMaterialDto;

    await this.findMaterialByName(name);

    const material = await this.materialRepository.create(createMaterialDto);

    return material;
  }

  async findAllMaterials(): Promise<Material[]> {
    const materials = await this.materialRepository.findAll({
      include: { all: true },
    });
    return materials;
  }

  async findOneMaterialById(id: number): Promise<Material> {
    const material = await this.materialRepository.findByPk(id, {
      include: { all: true },
    });
    if (!material) {
      throw new NotFoundException('Not found');
    }
    return material;
  }

  async updateMaterialById(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    await this.findOneMaterialById(id);

    const updatedMaterial = await this.materialRepository.update(
      updateMaterialDto,
      { where: { id }, returning: true },
    );

    return updatedMaterial[1][0];
  }

  async deleteMaterialById(id: number): Promise<Object> {
    await this.findOneMaterialById(id);
    await this.materialRepository.destroy({ where: { id } });

    return { message: `Material with id:${id} deleted` };
  }

  private async findMaterialByName(name: string): Promise<void> {
    const material = await this.materialRepository.findOne({ where: { name } });
    if (material) {
      throw new ForbiddenException('Already exists');
    }
  }
}
