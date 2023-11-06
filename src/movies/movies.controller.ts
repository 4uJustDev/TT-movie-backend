import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ObjectId } from 'mongoose';
import { addMovieToActor } from 'src/actors/dto/addMovieToActor.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(): Promise<Movie[]> {
        return this.movieService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Movie> {
        return this.movieService.getById(id);
    }
    @Post()
    create(@Body() film: CreateMovieDto): Promise<Movie> {
        return this.movieService.create(film);
    }

    @Put(':id')
    update(@Body() updateFilmDto: UpdateMovieDto, @Param('id') id: number): Promise<Movie> {
        return this.movieService.update(id, updateFilmDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<Movie> {
        return this.movieService.remove(id);
    }

    @Delete()
    removeDocuments() {
        return this.movieService.removeAll();
    }

    @Patch(':id')
    addActor(@Param('id') id: ObjectId, @Body() dto: addMovieToActor) {
        return this.movieService.addActorToMovie(id, dto.actors);
    }
}
