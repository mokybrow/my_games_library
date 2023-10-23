export interface ReviewCardModel {
    id: string,
    grade: number,
    comment: string,
    created_at: Date,
    user_id: string,
    username: string,
    img: string,
    game_id: string,
    title: string,
    cover: string,
    slug: string,
    like_count: number
}