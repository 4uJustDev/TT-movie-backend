import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorModule } from 'src/actor/actor.module';
import { FilesModule } from 'src/files/files.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        forwardRef(() => ActorModule),
        FilesModule,
    ],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [MovieService],
})
export class MovieModule {}
