import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateGlobalDto } from 'src/dto/updateGlobal.dto';
import { FilesService } from 'src/files/files.service';
import { createMovieDto } from './dto/createMovie.dto';
import { updateMovieDto } from './dto/updateMovie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
        private filesService: FilesService,
    ) {}

    async getAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }

    async getById(id: string): Promise<Movie> {
        return await this.movieModel.findById(id).populate('actors').lean().exec();
    }

    async create(dto: createMovieDto, poster: any): Promise<Movie> {
        try {
            console.log(poster);
            const fileName = await this.filesService.createFile(poster);
            return await this.movieModel.create({ ...dto, poster: fileName });
        } catch (error) {
            console.error('Error creating movie:', error);
            throw new HttpException('Error creating movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, dto: updateMovieDto): Promise<Movie> {
        return this.movieModel.findByIdAndUpdate(id, dto);
    }

    async remove(id: string): Promise<Movie> {
        const movie = await this.movieModel.findByIdAndRemove(id);

        // Delete associated file
        if (movie && movie.poster) {
            await this.filesService.deleteFile(movie.poster);
        }

        return movie;
    }

    async removeAll() {
        // Get all movies before deletion to retrieve associated files
        const movies = await this.movieModel.find();

        // Delete associated files
        for (const movie of movies) {
            if (movie.poster) {
                await this.filesService.deleteFile(movie.poster);
            }
        }

        // Delete all movies
        return this.movieModel.deleteMany({});
    }

    async addActorToMovie(id: string, dto: updateGlobalDto) {
        return this.movieModel.findByIdAndUpdate(id, { $push: { actors: dto.actors } });
    }
}
