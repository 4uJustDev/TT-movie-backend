import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { MovieService } from 'src/movie/movie.service';
import { updateGlobalDto } from '../dto/updateGlobal.dto';
import { ActorService } from './actor.service';
import { createActorDto } from './dto/createActor.dto';
import { Actor } from './schemas/actor.schema';

@Controller('actor')
export class ActorsController {
    constructor(
        private readonly actorService: ActorService,
        private readonly movieService: MovieService,
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
    create(@Body() actor: createActorDto): Promise<Actor> {
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
    addMovie(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() dto: updateGlobalDto) {
        dto.actors = id;
        this.actorService.addMovieToActor(id, dto);
        this.movieService.addActorToMovie(dto.movies, dto);
        return dto;
    }
}
