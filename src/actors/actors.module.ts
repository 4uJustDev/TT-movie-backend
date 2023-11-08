import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from 'src/movies/movies.module';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { Actor, ActorSchema } from './schemas/actor.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]),
        forwardRef(() => MoviesModule),
    ],
    controllers: [ActorsController],
    providers: [ActorsService],
    exports: [ActorsService],
})
export class ActorsModule {}
