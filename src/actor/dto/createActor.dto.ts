import { IsDateString, IsString, IsUrl } from 'class-validator';

export class createActorDto {
    @IsString({ message: 'Name must be a string.' })
    readonly name: string;

    @IsDateString({}, { message: 'Invalid date format for release_date.' })
    readonly birthday: Date;

    @IsString({ message: 'Biography must be a string.' })
    readonly biography: string;

    @IsString({ message: 'Invalid URL format for image_url.' })
    @IsUrl({}, { message: 'Invalid URL format for image_url.' })
    readonly image_url: string;
}
