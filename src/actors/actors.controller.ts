import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { MoviesService } from 'src/movies/movies.service';
import { ActorsService } from './actors.service';
import { addMovieToActor } from './dto/addMovieToActor.dto';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from './schemas/actor.schema';

@Controller('actors')
export class ActorsController {
    constructor(
        private readonly actorService: ActorsService,
        private readonly movieService: MoviesService,
    ) {}
    @Get()
    getAll(): Promise<Actor[]> {
        return this.actorService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId): Promise<Actor> {
        return this.actorService.getById(id);
    }
    @Post()
    create(@Body() actor: CreateActorDto): Promise<Actor> {
        return this.actorService.create(actor);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId): Promise<Actor> {
        return this.actorService.remove(id);
    }

    @Delete()
    removeDocuments() {
        return this.actorService.removeAll();
    }

    @Patch(':id')
    addMovie(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() dto: addMovieToActor) {
        this.actorService.addMovieToActor(id, dto);
        dto.actors = id;
        this.movieService.addActorToMovie(dto.movies, dto);
        return dto;
    }
}
