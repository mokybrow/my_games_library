import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GameAvgRate, GameProfileResponse, GameReviews, GamesResponse, IUser, RegResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";


export default class GameService {
    static async get_games(id: number): Promise<AxiosResponse<GamesResponse[]>> {

        return $api.get<GamesResponse[]>(`/games/page/${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

    static async getUserGames(user_id: string):Promise<AxiosResponse<GamesResponse[]>>  {
        return $api.get<GamesResponse[]>(`/last_game/${user_id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static async getGamesReview(id: string):Promise<AxiosResponse<GameReviews[]>>  {
        return $api.get<GameReviews[]>(`game/${id}/reviews/`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static async getGamesAvgRate(id: string):Promise<AxiosResponse<GameAvgRate>>  {
        return $api.get<GameAvgRate>(`game/${id}/avg_rate/`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static async addReview(id: string, grade: number):Promise<AxiosResponse>  {
        return $api.post(`game/add_review/`,{ params: {
            foo: 'bar'
          }},
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            },
        })
    }

}