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
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
    username: string,
    name: string,
    surname: string,
    birthdate: Date,
    gender: string
}

export interface AUser {
    birthdate: Date,
    gender: string
    img: string,
    name: string,
    surname: string,
    username: string,
    email: string
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


// export interface GameProfileResponse {
//     id: string
//     title: string
//     cover: string
//     slug: string
//     release: Date
//     platform: string;
// }

export interface GameProfileResponse {
    id:          string;
    title:       string;
    cover:       string;
    description: null;
    slug:        string;
    release:     Date;
    platform:    PlatformElement[];
    genre:       Genre[];
}

export interface Genre {
    id:               number;
    name:             string;
    slug:             string;
    games_count:      number;
    image_background: string;
}

export interface PlatformElement {
    platform: PlatformPlatform;
}

export interface PlatformPlatform {
    id:   number;
    name: string;
    slug: string;
}