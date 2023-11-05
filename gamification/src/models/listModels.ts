export interface CheckGameInDefaultListsResponseModel {
    passed: number
    liked: number
    wishilst: number
}

export interface CheckGameInUserListsResponseModel {
    list_id: string
    title: string
    in_list: number
}

export interface ListsGameResponse {
    game_id: string,
    slug: string,
    cover: any,
    title: string ,
}

export interface checkAddedListsGameResponse {
    user_id: string,
}