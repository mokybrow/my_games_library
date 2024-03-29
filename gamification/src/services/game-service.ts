import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { GameProfileResponse, GamesResponse } from "../models/gameModels";
import { userGrade } from "../models/userModels";
import { PageCountResponseModel } from "../models/generalModels";



export default class GameService {

    static async getGamesPages(page: number, limit: number | null, sort: string | null, decade: string | null, genre: string | null): Promise<AxiosResponse<GamesResponse[]>> {

        return $api.get<GamesResponse[]>(`/games/all`,

            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    page: page,
                    limit: limit,
                    sort: sort,
                    decade: decade,
                    genre: genre
                }
            })
    }
    static async getGamesCount(limit: number | null,  genre: string | null): Promise<AxiosResponse<PageCountResponseModel>> {

        return $api.get<PageCountResponseModel>(`/games/count`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    limit: limit,
                    genre: genre
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