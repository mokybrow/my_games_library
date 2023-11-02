export interface GameProfileResponse {
    id: string;
    title: string;
    cover: string;
    description: null;
    slug: string;
    release: Date | null;
    platform: string[];
    platform_name: string[];
    genre: string[];
    esrb_rating: string;
    avg_rate: number | null
}

export interface GamesResponse {
    id: string
    title: string
    cover: string
    slug: string
    release: Date
}