import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { addMovieToActor } from './dto/addMovieToActor.dto';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor, ActorDocument } from './schemas/actor.schema';

@Injectable()
export class ActorsService {
    constructor(@InjectModel(Actor.name) private actorModel: Model<ActorDocument>) {}

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

    async addMovieToActor(id: mongoose.Schema.Types.ObjectId, dto: addMovieToActor) {
        return this.actorModel.findByIdAndUpdate(id, { $push: { movies: dto.movies } });
    }
}
