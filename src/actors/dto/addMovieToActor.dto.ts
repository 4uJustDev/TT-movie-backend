import mongoose from 'mongoose';

export class addMovieToActor {
    movies: mongoose.Schema.Types.ObjectId;
    actors: mongoose.Schema.Types.ObjectId;
}
