import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GameAvgRate,  GameReviews, GamesCountResponse, GamesResponse, IUser, ListsGameResponse, RegResponse, UserActivityResponse, userGrade } from "../models/response";
import $api, { API_URL } from "../api/api";
import { GameProfileResponse } from "../models/gamesModels";



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
        return $api.post(`list/operation/wishlist`, null, {
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


}