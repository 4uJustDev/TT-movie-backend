import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Actor } from 'src/actors/schemas/actor.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
    @Prop({})
    tittle: string;

    @Prop({})
    description: string;

    @Prop({})
    release_date: Date;

    @Prop({})
    duration: number;

    @Prop({})
    plot: string;

    @Prop({})
    poster_url: string;

    @Prop({})
    trailer_url: string;

    @Prop({})
    rating_total: number;

    @Prop({})
    rating_value: number;

    @Prop({ ref: () => 'Actor', type: [{ type: mongoose.Schema.Types.ObjectId }] })
    actors: Actor[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
