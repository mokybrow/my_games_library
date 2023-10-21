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


export interface UserActivityResponse {
    id: string
    user_id: string
    game_id: string
    title: string
    cover: string
    activity_type: string
    slug: string
    created_at: Date
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
    platform: string[];
    platform_name: string[];
    genre: string[];
    esrb_rating: string;
}


export interface userGrade {
    id: string,
    user_id: string,
    game_id: string,
    grade: number,
    comment: string | null,
    created_at: Date
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
    hasAuthorLike: number,
    detail?: string 
}

export interface GameAvgRate {
    avg_rate: number;
}



export interface UserListsResponse{
    id: string,
    owner_id: string,
    title: string,
    slug: string,
    cover: string ,
    description: string | null,
    is_private: boolean,
    created_at: Date
}


export interface ListsGameResponse{
    game_id: string,
    slug: string,
    cover: any,
    title: string | null,
}

export interface checkAddedListsGameResponse{
    user_id: string,
}

export interface UserImg{
    img: any
}