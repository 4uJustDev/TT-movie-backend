import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { updateGlobalDto } from 'src/dto/updateGlobal.dto';
import { createActorDto } from './dto/createActor.dto';
import { Actor, ActorDocument } from './schemas/actor.schema';

@Injectable()
export class ActorService {
    constructor(@InjectModel(Actor.name) private actorModel: Model<ActorDocument>) {}

    async getAll(): Promise<Actor[]> {
        return await this.actorModel.find().exec();
    }

    async getById(id: ObjectId): Promise<Actor> {
        return await this.actorModel.findById(id).populate('movies').lean().exec();
    }

    async create(dto: createActorDto): Promise<Actor> {
        return await this.actorModel.create(dto);
    }

    async remove(id: ObjectId): Promise<Actor> {
        return this.actorModel.findByIdAndRemove(id);
    }

    async removeAll() {
        return this.actorModel.deleteMany({});
    }

    async addMovieToActor(id: mongoose.Schema.Types.ObjectId, dto: updateGlobalDto) {
        return this.actorModel.findByIdAndUpdate(id, { $push: { movies: dto.movies } });
    }
}
