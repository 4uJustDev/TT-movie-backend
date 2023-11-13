import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Movie, MovieSchema } from 'src/movie/schemas/movie.schema';
import { RoleModule } from 'src/role/role.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService],
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        RoleModule,
        forwardRef(() => AuthModule),
    ],
})
export class ReviewModule {}
