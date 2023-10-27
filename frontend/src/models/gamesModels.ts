export interface GameProfileResponse {
    id: string;
    title: string;
    cover: string;
    description: null;
    slug: string;
    release: Date;
    platform: string[];
    platform_name: string[];
    genre: string[];
    esrb_rating: string;
    avg_rate: number | null
}