import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ActorService } from 'src/actor/actor.service';
import { updateGlobalDto } from 'src/dto/updateGlobal.dto';
import { createMovieDto } from './dto/createMovie.dto';
import { updateMovieDto } from './dto/updateMovie.dto';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';

@Controller('movie')
export class MovieController {
    constructor(
        private readonly movieService: MovieService,
        private readonly actorService: ActorService,
    ) {}

    @Get()
    getAll(): Promise<Movie[]> {
        return this.movieService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Movie> {
        return this.movieService.getById(id);
    }

    @Post()
    create(@Body() film: createMovieDto): Promise<Movie> {
        return this.movieService.create(film);
    }

    @Put(':id')
    update(@Body() updateFilmDto: updateMovieDto, @Param('id') id: string): Promise<Movie> {
        return this.movieService.update(id, updateFilmDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Movie> {
        return this.movieService.remove(id);
    }

    @Delete()
    removeDocuments() {
        return this.movieService.removeAll();
    }

    @Patch(':id')
    addActor(@Param('id') id: string, @Body() dto: updateGlobalDto) {
        this.movieService.addActorToMovie(id, dto);
        dto.movies = id;
        this.actorService.addMovieToActor(dto.actors, dto);
        return dto;
    }
}
