import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GameProfileResponse, GamesResponse, IUser, RegResponse } from "../models/response";
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

    static async get_new_games(): Promise<AxiosResponse<GamesResponse[]>> {

        return $api.get<GamesResponse[]>(`/games/new/`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    static async get_game_by_slug(slug: string): Promise<AxiosResponse<GameProfileResponse>> {

        return $api.get<GameProfileResponse>(`/game/${slug}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

}