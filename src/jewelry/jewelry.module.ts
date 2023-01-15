import { Module } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { JewelryController } from './jewelry.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Jewelry } from './schemas/jewelry.model';
import { JwtModule } from '@nestjs/jwt';
import { Review } from '../review/schemas/review.model';
import { Detail } from '../detail/schemas/detail.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Jewelry, Review, Detail]),
    FilesModule,
    JwtModule,
  ],
  controllers: [JewelryController],
  providers: [JewelryService],
  exports: [JewelryService],
})
export class JewelryModule {}
