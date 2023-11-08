import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { addMovieToActor } from 'src/actors/dto/addMovieToActor.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private filmModel: Model<MovieDocument>) {}

    async getAll(): Promise<Movie[]> {
        return await this.filmModel.find().exec();
    }

    async getById(id: number) {
        return await this.filmModel.findById(id);
    }

    async create(dto: CreateMovieDto): Promise<Movie> {
        const createdFilm = await this.filmModel.create(dto);
        return createdFilm;
    }

    async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
        return this.filmModel.findByIdAndUpdate(id, dto);
    }
    async remove(id: number): Promise<Movie> {
        return this.filmModel.findByIdAndRemove(id);
    }

    async removeAll() {
        return this.filmModel.deleteMany({});
    }

    async addActorToMovie(id: mongoose.Schema.Types.ObjectId, dto: addMovieToActor) {
        return this.filmModel.findByIdAndUpdate(id, { $push: { actors: dto.actors } });
    }
}
