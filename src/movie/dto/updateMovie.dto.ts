import { IsOptional, IsString } from 'class-validator';

export class updateMovieDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string.' })
    readonly title?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string.' })
    readonly description?: string;
}
