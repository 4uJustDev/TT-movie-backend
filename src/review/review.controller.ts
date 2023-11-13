import { Body, Controller, Delete, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roleAuth.decorator';
import { createReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Roles(Role.User, Role.Admin)
    @UseGuards(RoleGuard)
    @Post(':movieId')
    async create(
        @Param('movieId') movieId: string,
        @Request() req,
        @Body() reviewData: createReviewDto,
    ) {
        const userId = req.user.id;
        return this.reviewService.createReview(movieId, userId, reviewData);
    }

    @Delete(':id')
    removeReview(@Param('id') id: string): Promise<Review> {
        return this.reviewService.deleteReviewById(id);
    }

    @Delete()
    removeReviews(): Promise<void> {
        return this.reviewService.removeAllReviews();
    }
}
