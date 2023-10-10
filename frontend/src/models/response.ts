export interface AuthResponse {
    access_token: string
    token_type: string
}

export interface RegResponse {
    id: string
    email: string
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
    username: string,
    name: string,
    surname: string,
    birthdate: Date,
    gender: string

}

export interface IUser {
    id: string
    email: string
    img: string,
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
    username: string,
    name: string,
    surname: string,
    birthdate: Date,
    gender: string
    list_count: number,
    follower_count: number,
    passed_game_count: number,
    wanted_game_count: number
}

export interface AUser {
    id: string,
    name: string,
    surname: string,
    img: string,
    username: string,
    list_count: number,
    follower_count: number,
    passed_game_count: number,
    wanted_game_count: number
}

export interface RegEmailCheck {
    result: boolean,
}

export interface detail {
    detail: string
}


export interface GamesResponse {
    id: string
    title: string
    cover: string
    slug: string
    release: Date
}
export interface GamesCountResponse {
    count: number
}

export interface UserLastReviews {
    game_id: string,
    user_id: string,
    grade: number,
    cover: string,
    slug: string
}

export interface UserStat {
    follow: boolean
}


export interface GameProfileResponse {
    id: string;
    title: string;
    cover: string;
    description: null;
    slug: string;
    release: Date;
    platform: PlatformElement[];
    genre: Genre[];
    esrb_ratin: string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface userGrade {
    id: string,
    user_id: string,
    game_id: string,
    grade: number,
    comment: string | null,
    created_at: Date
}



export interface PlatformElement {
    platform: PlatformPlatform;
    released_at: Date;
    requirements_en: null;
    requirements_ru: null;
}

export interface PlatformPlatform {
    id: number;
    name: string;
    slug: string;
    image: null;
    year_end: null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}


export interface GameReviews {
    id: string,
    username: string,
    img: string | null,
    user_id: string,
    grade: 3,
    comment: string | null,
    created_at: Date,
    review_id: string,
    review_likes: number,
    hasAuthorLike: number
}

export interface GameAvgRate {
    avg_rate: number;

}