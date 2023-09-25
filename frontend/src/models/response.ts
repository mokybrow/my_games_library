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
}