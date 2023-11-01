export class CreateMovieDto {
    readonly tittle: string;

    readonly description: string;

    readonly release_date: Date;

    readonly duration: number;

    readonly plot: string;

    readonly poster_url: string;

    readonly trailer_url: string;

    readonly rating_total: number;

    readonly rating_value: number;
}
