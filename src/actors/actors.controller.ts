import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Actor } from './schemas/actor.schema';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorsService } from './actors.service';
import { ObjectId } from 'mongoose';
import { addMovieToActor } from './dto/addMovieToActor.dto';

@Controller('actors')
export class ActorsController {
    constructor(private readonly movieService: ActorsService) {}

    @Get()
    getAll(): Promise<Actor[]> {
        return this.movieService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId): Promise<Actor> {
        return this.movieService.getById(id);
    }
    @Post()
    create(@Body() actor: CreateActorDto): Promise<Actor> {
        return this.movieService.create(actor);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId): Promise<Actor> {
        return this.movieService.remove(id);
    }

    @Delete()
    removeDocuments() {
        return this.movieService.removeAll();
    }

    @Patch(':id')
    addMovie(@Param('id') id: ObjectId, @Body() dto: addMovieToActor) {
        return this.movieService.addMovie(id, dto);
    }
}
