import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, RegEmailCheck, RegResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";
import { ArticleResponseModel } from "../models/articlesModels";
import { PageCountResponseModel } from "../models/generalModels";

export default class ArticleService {

    static async createArticle(title: string, text: string, tags: string, cover: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.set('cover', cover);

        return $api.post(`article/create`, formData,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    title: title,
                    text: text,
                    tags: tags,
                }
            },)
    }
    static async getAllArticles(offset: number | null, limit: number | null, popular: boolean | null, date: boolean | null): Promise<AxiosResponse<ArticleResponseModel[]>> {

        return axios.get<ArticleResponseModel[]>(`${API_URL}article/get/all`,
            {
                params: {
                    offset: offset,
                    limit: limit,
                    popular: popular,
                    date: date
                }
            },)
    }
    static async getArticleCount(): Promise<AxiosResponse<PageCountResponseModel>> {

        return axios.get<PageCountResponseModel>(`${API_URL}article/all/count`,)
    }
}
