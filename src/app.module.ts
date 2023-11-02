import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MoviesModule,
        ActorsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
