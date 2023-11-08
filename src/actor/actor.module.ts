import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from 'src/movie/movie.module';
import { ActorsController } from './actor.controller';
import { ActorService } from './actor.service';
import { Actor, ActorSchema } from './schemas/actor.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]),
        forwardRef(() => MovieModule),
    ],
    controllers: [ActorsController],
    providers: [ActorService],
    exports: [ActorService],
})
export class ActorModule {}
