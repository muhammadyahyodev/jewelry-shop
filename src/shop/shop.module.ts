import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './schemas/shop.model';
import { JwtModule } from '@nestjs/jwt';
import { JewelryModule } from '../jewelry/jewelry.module';

@Module({
  imports: [SequelizeModule.forFeature([Shop]), JewelryModule, JwtModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
