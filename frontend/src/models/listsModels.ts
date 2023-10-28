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