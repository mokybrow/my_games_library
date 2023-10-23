import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { ReviewCardModel } from "../models/reviewModels";
import { PageCountResponseModel} from "../models/generalModels";
import { GamesResponse } from "../models/response";

export default class SearchService {


    static async searchGame(title: any): Promise<AxiosResponse<GamesResponse[]>> {
        return axios.get<GamesResponse[]>(`${API_URL}game/search`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    title: title,
                }
            })
    }
}