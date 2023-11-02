import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Actor, ActorDocument } from './schemas/actor.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateActorDto } from './dto/create-actor.dto';
import { addMovieToActor } from './dto/addMovieToActor.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ActorsService {
    constructor(
        @InjectModel(Actor.name) private actorModel: Model<ActorDocument>,
        private readonly MService: MoviesService,
    ) {}

    async getAll(): Promise<Actor[]> {
        return await this.actorModel.find().exec();
    }

    async getById(id: ObjectId): Promise<Actor> {
        return await this.actorModel.findById(id).populate('movies').lean().exec();
    }

    async create(dto: CreateActorDto): Promise<Actor> {
        const createdFilm = await this.actorModel.create(dto);
        return createdFilm;
    }

    async remove(id: ObjectId): Promise<Actor> {
        return this.actorModel.findByIdAndRemove(id);
    }

    async removeAll() {
        return this.actorModel.deleteMany({});
    }

    async addMovieToActor(id: ObjectId, dto: addMovieToActor) {
        const test = dto.movies;
        console.log(test);
        console.log(id);
        await this.MService.addActorToMovie(dto.movies, id);
        return this.actorModel.findByIdAndUpdate(id, { $push: dto });
    }
}
