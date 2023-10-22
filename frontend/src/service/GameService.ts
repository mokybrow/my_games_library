import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GameAvgRate, GameProfileResponse, GameReviews, GamesCountResponse, GamesResponse, IUser, ListsGameResponse, RegResponse, UserActivityResponse, userGrade } from "../models/response";
import $api, { API_URL } from "../api/api";



export default class GameService {

    static async getGamesPages(page: number, sort: string | null, decade: string | null, genre: string | null): Promise<AxiosResponse<GamesResponse[]>> {

        return $api.get<GamesResponse[]>(`/games/all`,

            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    page,
                    sort,
                    decade,
                    genre
                }
            })
    }
    static async getGamesCount(sort: string | null, decade: string | null, genre: string | null): Promise<AxiosResponse<GamesCountResponse>> {

        return $api.get<GamesCountResponse>(`/games/count`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    sort,
                    decade,
                    genre
                }
            })
    }

    static async getNewGames(): Promise<AxiosResponse<GamesResponse[]>> {
        return $api.get<GamesResponse[]>(`/games/new/`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }
    static async getGameBySlug(slug: string): Promise<AxiosResponse<GameProfileResponse>> {
        return $api.get<GameProfileResponse>(`/game/get/profile`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    slug: slug,
                }
            })
    }


    static async getGamesReviewUnAuth(id: string): Promise<AxiosResponse<GameReviews[]>> {
        return $api.get<GameReviews[]>(`game/${id}/reviews/all`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }
    static async getGamesReview(id: string): Promise<AxiosResponse<GameReviews[]>> {
        return $api.get<GameReviews[]>(`game/${id}/reviews/`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }

    static async getGamesAvgRate(id: string): Promise<AxiosResponse<GameAvgRate>> {
        return $api.get<GameAvgRate>(`game/${id}/avg_rate/`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }

    static async addReview(id: string, grade: number, comment: string | null): Promise<AxiosResponse> {
        return $api.post(`review/add`, null, {
            params: {
                game_id: id,
                grade: grade,
                comment: comment
            }
        })
    }

    static async getUserGrade(game_id: string): Promise<AxiosResponse<userGrade>> {
        return $api.get<userGrade>(`review/game/user/grade`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }

    static async checkInPassedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`/list/check/in_passed`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }
    static async checkInLikedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`/list/check/in_liked`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }
    static async checkInWantedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`/list/check/in_wishlish`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }

    static async operationWithPassed(game_id: string): Promise<AxiosResponse> {
        return $api.post(`list/operation/passed`, null, {
            params: {
                game_id: game_id,

            }
        })
    }
    static async operationWithLiked(game_id: string): Promise<AxiosResponse> {
        return $api.post(`list/operation/liked`, null, {
            params: {
                game_id: game_id,

            }
        })
    }
    static async operationWithWanted(game_id: string): Promise<AxiosResponse> {
        return $api.post(`list/operation/wishlish`, null, {
            params: {
                game_id: game_id,

            }
        })
    }


    static async deleteUserRate(game_id: string): Promise<AxiosResponse> {
        return $api.delete(`review/delete`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }

    static async likeToUserComment(review_id: string): Promise<AxiosResponse> {
        return $api.post(`review/like/user/review`, null, {
            params: {
                review_id: review_id,

            }
        })
    }

    // static async getUserWantedGames(user_id: string): Promise<AxiosResponse<ListsGameResponse[]>> {
    //     return $api.get<ListsGameResponse[]>(`/user/wantplay/games`, { params: { user_id: user_id } })
    // }

    // static async getUserLikedGames(user_id: string): Promise<AxiosResponse<ListsGameResponse[]>> {
    //     return $api.get<ListsGameResponse[]>(`/user/like/games`, { params: { user_id: user_id } })
    // }

    // static async getUserPassedGames(user_id: string): Promise<AxiosResponse<ListsGameResponse[]>> {
    //     return axios.get<ListsGameResponse[]>(`/user/passed/games`, { params: { user_id: user_id } })
    // }

}