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
        return $api.get<GameProfileResponse>(`/game/${slug}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }

    static async getUserGames(user_id: string): Promise<AxiosResponse<UserActivityResponse[]>> {
        return $api.get<UserActivityResponse[]>(`/last/game/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
        return $api.post(`game/add_review/`, null, {
            params: {
                game_id: id,
                grade: grade,
                comment: comment
            }
        })
    }

    static async getUserGrade(id: string): Promise<AxiosResponse<userGrade>> {
        return $api.get<userGrade>(`game/get_user_rate/game_id/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }

    static async checkInPassedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`check/game_in_passed_list/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }
    static async checkInWantedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`check/game_in_wanted_list/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }
    static async checkInLikedList(game_id: string): Promise<AxiosResponse> {
        return $api.get(`check/game_in_liked_list/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }

    static async operationWithWanted(game_id: string): Promise<AxiosResponse> {
        return $api.post(`lists/operation/wantplay/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }
    static async operationWithPassed(game_id: string): Promise<AxiosResponse> {
        return $api.post(`lists/operation/passed/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }
    static async operationWithLiked(game_id: string): Promise<AxiosResponse> {
        return $api.post(`lists/operation/liked/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }

    static async deleteUserRate(game_id: string): Promise<AxiosResponse> {
        return $api.delete(`game/delete/review/${game_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
            })
    }

    static async likeToUserComment(review_id: string): Promise<AxiosResponse> {
        return $api.post(`game/like/user/review/${review_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
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