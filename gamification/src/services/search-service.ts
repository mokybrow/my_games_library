import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { ReviewCardModel } from "../models/reviewModels";
import { PageCountResponseModel} from "../models/generalModels";
import { SearchItemResponse } from "../models/searchModel";

export default class SearchService {


    static async searchItem(tag: string, title: string): Promise<AxiosResponse<SearchItemResponse[]>> {
        return axios.get<SearchItemResponse[]>(`${API_URL}search`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    tag: tag,
                    title: title,
                }
            })
    }
}