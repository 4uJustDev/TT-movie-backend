import { IsMongoId, IsString } from 'class-validator';

export class createReviewDto {
    @IsString({ message: 'Rating must be a string.' })
    readonly rating: string;

    @IsString({ message: 'Message must be a string.' })
    readonly message: string;

    @IsMongoId({ message: 'Invalid movie ID.' })
    readonly movie: string;
}
