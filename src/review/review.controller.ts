import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UserGuard } from '../guards/user.guard';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.model';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly rewiewService: ReviewService) {}

  @ApiOperation({ summary: 'create new review' })
  @ApiResponse({ status: 200, type: [Review] })
  @ApiBearerAuth()
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRewiewDto: CreateRewiewDto) {
    return this.rewiewService.createReview(createRewiewDto);
  }

  @ApiOperation({ summary: 'show all review' })
  @ApiResponse({ status: 200, type: [Review] })
  @Get()
  findAll() {
    return this.rewiewService.findAllReviews();
  }

  @ApiOperation({ summary: 'show review by id' })
  @ApiResponse({ status: 200, type: [Review] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewiewService.findReviewById(+id);
  }

  @ApiOperation({ summary: 'update review by id' })
  @ApiResponse({ status: 200, type: [Review] })
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRewiewDto: UpdateRewiewDto) {
    return this.rewiewService.updateReviewById(+id, updateRewiewDto);
  }

  @ApiOperation({ summary: 'delete review by id' })
  @ApiResponse({ status: 200, type: [Review] })
  @ApiBearerAuth()
  // bunga dostup hamma admin va shu userning o'zi
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewiewService.deleteReviewById(+id);
  }
}
