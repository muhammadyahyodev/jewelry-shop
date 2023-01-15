import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundError } from 'rxjs';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { Review } from './schemas/review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private readonly reviewRepository: typeof Review,
  ) {}

  async createReview(createRewiewDto: CreateRewiewDto): Promise<Review> {
    const review = await this.reviewRepository.create(createRewiewDto);

    return review;
  }

  async findAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewRepository.findAll({
      include: { all: true },
    });

    return reviews;
  }

  async findReviewById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findByPk(id, {
      include: { all: true },
    });

    if (!review) {
      throw new NotFoundException('Not found review with this id');
    }

    return review;
  }

  async updateReviewById(
    id: number,
    updateRewiewDto: UpdateRewiewDto,
  ): Promise<Review> {
    await this.findReviewById(id);

    const review = await this.reviewRepository.update(updateRewiewDto, {
      where: { id },
      returning: true,
    });

    return review[1][0];
  }

  async deleteReviewById(id: number): Promise<Object> {
    await this.findReviewById(id);
    await this.reviewRepository.destroy({ where: { id } });

    return { message: `Review with id:${id} deleted` };
  }
}
