import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Actor } from './schemas/actor.schema';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorsService } from './actors.service';
import { ObjectId } from 'mongoose';
import { addMovieToActor } from './dto/addMovieToActor.dto';

@Controller('actors')
export class ActorsController {
    constructor(private readonly actorService: ActorsService) {}
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
    addMovie(@Param('id') id: ObjectId, @Body() dto: addMovieToActor) {
        return this.actorService.addMovieToActor(id, dto);
    }
}
