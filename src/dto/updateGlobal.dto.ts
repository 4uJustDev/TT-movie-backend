import { IsMongoId, IsOptional } from 'class-validator';

export class updateGlobalDto {
    @IsOptional()
    @IsMongoId({ message: 'Invalid movie ID.' })
    movies: string;

    @IsOptional()
    @IsMongoId({ message: 'Invalid actor ID.' })
    actors: string;

    @IsOptional()
    @IsMongoId({ message: 'Invalid role ID.' })
    roles: string;
}
