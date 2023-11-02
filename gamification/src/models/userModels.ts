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
    wanted_game_count: number,
    registr_at: Date | null,
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
    registr_at: Date | null,
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

export interface UserLastReviews {
    game_id: string,
    user_id: string,
    grade: number,
    cover: string,
    slug: string
}

export interface UserListsResponse {
    id: string,
    owner_id: string,
    title: string,
    slug: string,
    cover: string,
    description: string | null,
    is_private: boolean,
    created_at: Date
}

export interface  CheckFollowResponse{
    result: boolean
}

export interface userGrade {
    id: string,
    user_id: string,
    game_id: string,
    grade: number,
    comment: string | null,
    created_at: Date | null
}