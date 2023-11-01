import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
    @Prop({})
    tittle: string;

    @Prop({})
    description: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
