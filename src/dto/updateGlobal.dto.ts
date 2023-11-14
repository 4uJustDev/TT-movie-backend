import { IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class updateGlobalDto {
    @IsOptional()
    @IsMongoId({ message: 'Invalid movie ID.' })
    movies: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsMongoId({ message: 'Invalid actor ID.' })
    actors: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsMongoId({ message: 'Invalid role ID.' })
    roles: mongoose.Schema.Types.ObjectId;
}
