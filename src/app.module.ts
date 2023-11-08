import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorModule } from './actors/actor.module';
import { MovieModule } from './movies/movie.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MovieModule,
        ActorModule,
    ],
})
export class AppModule {}
