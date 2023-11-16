export interface getOneArticleResponse {
    id: string
    user_id: string
    title: string
    cover: string
    text: string
    snippet: string
    slug: string
    publishing: boolean
    tags: string[]
    username: string
    img: string
    like_count: number
    created_at: Date
    hasAuthorLike: number | null
}

export interface ArticleResponseModel {
    id: string
    user_id: string
    title: string
    snippet : any
    cover: string
    slug: string
    publishing: boolean
    tags: string[]
    username: string
    img: string
    like_count: number
    created_at: Date
    hasAuthorLike: number | null
}