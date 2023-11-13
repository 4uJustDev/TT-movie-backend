import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from 'src/movie/schemas/movie.schema';
import { createReviewDto } from './dto/createReview.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    ) {}

    async createReview(
        movieId: string,
        userId: string,
        reviewData: createReviewDto,
    ): Promise<Review> {
        // Check if the user has already submitted a review for this movie
        const existingReview = await this.reviewModel.findOne({ movie: movieId, user: userId });
        if (existingReview) {
            throw new ConflictException('You have already submitted a review for this movie');
        }

        // Find the movie
        const movie = await this.movieModel.findById(movieId);
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        // Create a new review
        const review = new this.reviewModel({
            ...reviewData,
            movie: movieId,
            user: userId,
        });

        // Update movie ratings
        const rating = parseInt(reviewData.rating, 10);
        if (!isNaN(rating)) {
            movie.rating_value = (movie.rating_value || 0) + rating;
            movie.rating_total = (movie.rating_total || 0) + 1;
            await movie.save();
        }

        // Save the review
        await review.save();

        // Push the review ID to the movie's reviews array
        movie.reviews.push(review.id);
        await movie.save();

        return review;
    }

    async removeAllReviews(): Promise<void> {
        // Find all reviews
        const allReviews = await this.reviewModel.find();

        // Create a map to store total ratings and values for each movie
        const movieRatingMap = new Map<string, { total: number; value: number }>();

        // Iterate through each review
        for (const review of allReviews) {
            const reviewId = review._id;

            // Update the associated movie to remove the review's ID
            const movie = await this.movieModel.findById(review.movie);
            if (movie) {
                movie.reviews = movie.reviews.filter(
                    (movieReviewId) => movieReviewId.toString() !== reviewId.toString(),
                );

                // Update the total ratings and value in the map
                if (movieRatingMap.has(movie.id)) {
                    const ratings = movieRatingMap.get(movie.id);
                    ratings.total -= 1;
                    ratings.value -= review.rating;
                } else {
                    movieRatingMap.set(movie.id, { total: 0, value: 0 });
                }

                await movie.save();
            }

            // Delete the review
            await this.reviewModel.findByIdAndDelete(reviewId);
        }

        // Update the movie documents with the calculated rating fields
        for (const [movieId, ratings] of movieRatingMap.entries()) {
            await this.movieModel.findByIdAndUpdate(movieId, {
                $set: { reviews: [], rating_total: ratings.total, rating_value: ratings.value },
            });
        }
    }

    async deleteReviewsByMovieId(movieId: string): Promise<void> {
        // Find all reviews for the movie
        const reviews = await this.reviewModel.find({ movie: movieId });

        // Iterate through each review
        for (const review of reviews) {
            // Delete the review
            await this.reviewModel.findByIdAndDelete(review._id);
        }

        // Update the movie document to clear rating fields and remove references to the deleted reviews
        await this.movieModel.findByIdAndUpdate(movieId, {
            $set: { reviews: [], rating_total: 0, rating_value: 0 },
        });
    }

    async deleteReviewById(reviewId: string): Promise<Review> {
        // Find the review
        const review = await this.reviewModel.findById(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found');
        }

        // Find the associated movie
        const movie = await this.movieModel.findById(review.movie);
        if (movie) {
            // Update the movie's rating fields
            movie.rating_total -= 1;
            movie.rating_value -= review.rating;

            // Remove the review's ID from the movie's reviews array
            movie.reviews = movie.reviews.filter(
                (movieReviewId) => movieReviewId.toString() !== reviewId.toString(),
            );

            await movie.save();
        }

        // Delete the review
        return this.reviewModel.findByIdAndRemove(reviewId);
    }
}
