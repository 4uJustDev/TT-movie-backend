import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';

export type ActorDocument = HydratedDocument<Actor>;

@Schema({ timestamps: true })
export class Actor {
    @Prop({})
    name: string;

    @Prop({})
    birthday: Date;

    @Prop({})
    biography: string;

    @Prop({})
    image_url: string;

    @Prop({ ref: () => 'Movie', type: [{ type: mongoose.Schema.Types.ObjectId }] })
    movies: Movie[];
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
