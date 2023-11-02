import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';

export type ActorDocument = Actor & Document;

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
// @Prop({
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
//   })
//   @Type(() => Category)
//   categories: Category;
