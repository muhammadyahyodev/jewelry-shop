import { Module } from '@nestjs/common';
import { JewelryTypeService } from './jewelry-type.service';
import { JewelryTypeController } from './jewelry-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JewelryType } from './schemas/jewelry-type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([JewelryType]), JwtModule],
  controllers: [JewelryTypeController],
  providers: [JewelryTypeService],
})
export class JewelryTypeModule {}
