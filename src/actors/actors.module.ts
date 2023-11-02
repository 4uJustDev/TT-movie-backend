import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from './schemas/actor.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])],
    controllers: [ActorsController],
    providers: [ActorsService],
})
export class ActorsModule {}
