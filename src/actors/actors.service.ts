import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Actor, ActorDocument } from './schemas/actor.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateActorDto } from './dto/create-actor.dto';
import { addMovieToActor } from './dto/addMovieToActor.dto';

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

    async addMovie(id: ObjectId, dto: addMovieToActor) {
        return this.actorModel.findByIdAndUpdate(id, { $push: dto });
    }

    // async addMovie(id: ObjectId) {
    //     console.log(typeof '65428489070c3d09029c930f'); ##string
    //     return this.actorModel.findByIdAndUpdate(id, {
    //         $push: { movies: '65428489070c3d09029c930f' },
    //     });
    // }
}
