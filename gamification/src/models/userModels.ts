export interface IUserModel {
    id: string
    email: string
    img: string,
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
    reporter: boolean,
    subscriber: boolean,
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

export interface UserResponseModel {
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
