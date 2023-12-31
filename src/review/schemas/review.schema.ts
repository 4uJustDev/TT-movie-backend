import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';
import { User } from 'src/user/schemas/user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
    @Prop({})
    rating: number;

    @Prop({})
    message: string;

    @Prop({})
    release_date: Date;

    @Prop({ ref: () => 'Movie', type: mongoose.Schema.Types.ObjectId })
    movie: Movie;

    @Prop({ ref: () => 'User', type: mongoose.Schema.Types.ObjectId })
    user: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
