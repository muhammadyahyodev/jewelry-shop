import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from './schemas/detail.model';
import { JwtModule } from '@nestjs/jwt';
import { Material } from '../material/schemas/material.model';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Material]), JwtModule],
  controllers: [DetailController],
  providers: [DetailService],
})
export class DetailModule {}
