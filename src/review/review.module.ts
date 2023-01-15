import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Jewelry } from '../jewelry/schemas/jewelry.model';
import { User } from '../user/schemas/user.model';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, User, Jewelry]), JwtModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
