import mongoose from 'mongoose';

export class updateGlobalDto {
    movies: mongoose.Schema.Types.ObjectId;
    actors: mongoose.Schema.Types.ObjectId;
}
