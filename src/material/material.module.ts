import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Material } from './schemas/material.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Material]), JwtModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
