import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from './schemas/actor.schema';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]), MoviesModule],
    controllers: [ActorsController],
    providers: [ActorsService],
})
export class ActorsModule {}
