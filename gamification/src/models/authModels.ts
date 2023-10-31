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

export interface RegValidationModel {
    result: boolean,
}