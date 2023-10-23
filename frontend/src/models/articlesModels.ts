export interface ArticleResponseModel {
    id: string
    user_id: string
    title: string
    cover: string
    text: string
    slug: string
    publishing: boolean
    tags: string[]
    username: string
    img: string
    like_count: number
    created_at: Date
}