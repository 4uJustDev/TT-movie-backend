import mongoose from 'mongoose';

export class createReviewDto {
    readonly rating: string;

    readonly message: Date;

    readonly movie: mongoose.Schema.Types.ObjectId;
}
