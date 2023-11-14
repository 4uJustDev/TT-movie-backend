import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateGlobalDto } from 'src/dto/updateGlobal.dto';
import { createMovieDto } from './dto/createMovie.dto';
import { updateMovieDto } from './dto/updateMovie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

    async getAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }

    async getById(id: string): Promise<Movie> {
        return await this.movieModel.findById(id).populate('actors').lean().exec();
    }

    async create(dto: createMovieDto): Promise<Movie> {
        return await this.movieModel.create(dto);
    }

    async update(id: string, dto: updateMovieDto): Promise<Movie> {
        return this.movieModel.findByIdAndUpdate(id, dto);
    }

    async remove(id: string): Promise<Movie> {
        return this.movieModel.findByIdAndRemove(id);
    }

    async removeAll() {
        return this.movieModel.deleteMany({});
    }

    async addActorToMovie(id: string, dto: updateGlobalDto) {
        return this.movieModel.findByIdAndUpdate(id, { $push: { actors: dto.actors } });
    }
}
