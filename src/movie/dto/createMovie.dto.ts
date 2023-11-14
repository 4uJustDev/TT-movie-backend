// import { Type } from 'class-transformer';
// import {
//     IsArray,
//     IsDateString,
//     IsInt,
//     IsOptional,
//     IsString,
//     IsUrl,
//     Min,
//     ValidateNested,
// } from 'class-validator';

// class PhotoDto {
//     @IsUrl({}, { message: 'Invalid URL format for photo.' })
//     readonly url: string;
// }

// export class createMovieDto {
//     @IsString({ message: 'Title must be a string.' })
//     readonly title: string;

//     @IsString({ message: 'Description must be a string.' })
//     readonly description: string;

//     @IsDateString({}, { message: 'Invalid date format for release_date.' })
//     readonly release_date: Date;

//     @IsInt({ message: 'Duration must be an integer.' })
//     @Min(1, { message: 'Duration must be at least 1 minute.' })
//     readonly duration: number;

//     @IsString({ message: 'Plot must be a string.' })
//     readonly plot: string;

//     @IsString({ message: 'Invalid URL format for poster_url.' })
//     readonly poster_url: string;

//     @IsString({ message: 'Invalid URL format for trailer_url.' })
//     readonly trailer_url: string;

//     @IsOptional()
//     @IsArray({ message: 'Invalid format for photos.' })
//     @ValidateNested({ each: true })
//     @Type(() => PhotoDto)
//     readonly photos?: PhotoDto[];
// }

export class createMovieDto {
    readonly title: string;

    readonly description: string;

    readonly release_date: Date;

    readonly duration: number;

    readonly plot: string;

    readonly poster: string;

    readonly trailer_url: string;

    readonly photos: string[];
}
