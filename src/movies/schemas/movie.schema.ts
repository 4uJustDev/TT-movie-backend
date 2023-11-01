import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

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
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
