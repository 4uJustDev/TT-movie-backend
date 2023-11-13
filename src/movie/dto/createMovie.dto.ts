export class createMovieDto {
    readonly tittle: string;

    readonly description: string;

    readonly release_date: Date;

    readonly duration: number;

    readonly plot: string;

    readonly poster_url: string;

    readonly trailer_url: string;

    readonly photos?: { url: string }[];
}
