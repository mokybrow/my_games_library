import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

import { PageCountResponseModel } from "../models/generalModels";
import { ArticleResponseModel } from "../models/articleModels";

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
    static async getAllArticles(page: number | null, limit: number | null, popular: boolean | null, date: boolean | null, user_id: string | null): Promise<AxiosResponse<ArticleResponseModel[]>> {

        return axios.get<ArticleResponseModel[]>(`${API_URL}article/get/all`,
            {
                params: {
                    page: page,
                    limit: limit,
                    popular: popular,
                    date: date,
                    user_id: user_id
                }
            },
            )
    }
    
    static async getArticleCount(limit: number): Promise<AxiosResponse<PageCountResponseModel>> {

        return axios.get<PageCountResponseModel>(`${API_URL}article/all/count`,
        {
            params: {
                limit: limit,
            }
        },)
    }

    static async likeArticle(article_id: string): Promise<AxiosResponse<ArticleResponseModel[]>> {

        return $api.post<ArticleResponseModel[]>(`/article/like`, null,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            params: {
                article_id: article_id,
            }
        },)
    }
}