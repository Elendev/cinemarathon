/**
 * Response format from https://pathe.ch/solr/pathe-movies
 */
export interface SolrResponse<T> {
    responseHeader: {
        QTime: number;
        status: number;
        zkConnected: boolean;
        params: {
            [key: string]: any;
        }
    };
    response: {
        start: number;
        numFound: number;
        docs: T[];
    };
    facet_counts: any; // TBD
}

/**
 * Response format from https://pathe.ch/solr/pathe-movies/detail
 */
export interface DetailMovieResponse extends SolrResponse<Movie> {}

export enum MovieType {
    Movie = 'movie',
}

/**
 * Movies as they are returned from the https://pathe.ch/solr/pathe-movies/detail URL
 */
export interface Movie {
    cast: string[];
    cast_voice: any; // Boolean ?
    director: string[];
    duration: number; // in minutes
    genre: string[];
    id: string;
    lang_ov: string; // langcode in 2 chars (fr, en, ...)
    oneline_en: string; // one line resume
    oneline_fr: string;
    poster_fr: string; // ID of the poster... ?
    realse_fr_ch: string; // release date in ISO format
    synopsis_en: string;
    synopsis_fr: string;
    title: string; // Original title
    title_s: string;
    title_fr: string;
    title_fr_s: string;
    title_de: string;
    title_de_s: string;
    trailer_embed_fr: string;
    type: MovieType;
}

/**
 * Response format from https://pathe.ch/api/fr/react/movie
 */
export interface MovieResponse {
    [key: number]: MovieTeaser;
}

export interface MovieTeaser {
    title: string;
    poster: Poster;
}

export interface Poster {
    df: string; // 353x498px
    lg: {
        x1: string, // 353x498px
        x2: string, // 706x996px
    };
    md: {
        x1: string, // 450x635px
        x2: string, // 900x1270px
    };
    original: string; // 992x1400px download link
    sm: string; // 353x498px
    xs: string; // 353x498px
}

/**
 * Response format from the https://pathe.ch/solr/pathe-movies/schedule URL
 */
export interface ScheduleResponse extends SolrResponse<Schedule> {}

export enum ScheduleAttribute {
    '3D' = '_3d',
    Imax = 'imax',
    '4dx' = '4dx',
}

export enum ScheduleDaytime {
    Morning = 'morning',
    Afternoon = 'afternoon',
    Evening = 'evening',
}

export enum Site {
    FLO = 'FLO', // Flon
    GAL = 'GAL', // Galleries
    BAL = 'BAL', // Balexert
    DIE = 'DIE', // Dietikon
    MOS = 'MOS', // ?
    KUC = 'KUC', // ?
    WES = 'WES', // Bern West...
    // TODO
}

export interface Schedule {
    age: string; // 12/12
    attribute: ScheduleAttribute[];
    auditorium: number;
    cinemadate: string; // format dd.mm.YYYY
    date: string; // format dd.mm.YYYY
    daytime: ScheduleDaytime;
    duration: number; // in minute
    id: string;
    language: string; // langcode in two chars (en, fr, ...)
    movie_id: string;
    show: string; // Show resume, like "20:00, fr, _3d, 4dx"
    site: Site; // One of the sites, FLO
    time: string; // format hh:mm
    timestamp: string; // date in ISO format
    title: string; // Original title
    title_s: string;
    title_fr: string;
    title_fr_s: string;
    title_de: string;
    title_de_s: string;
    type: string; // Schedule
}

/**
 * Represent the Pathe API
 */
export class Pathe {
    /**
     * Get all available movies
     * @return {Promise<Movie[]>}
     */
    public async getMoviesDetail(): Promise<Movie[]> {
        const response: DetailMovieResponse = await (await fetch('https://pathe.ch/solr/pathe-movies/detail')).json();
        return response.response.docs;
    }

    /**
     * Get all available schedules
     * @return {Promise<Schedule[]>}
     */
    public async getSchedule(): Promise<Schedule[]> {
        const response: ScheduleResponse = await (await fetch('https://pathe.ch/solr/pathe-movies/schedule')).json();
        return response.response.docs;
    }
}

const patheInstance = new Pathe();

export default patheInstance;
