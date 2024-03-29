import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

import { PageCountResponseModel } from "../models/generalModels";
import { ArticleResponseModel, getOneArticleResponse } from "../models/articleModels";

export default class ArticleService {

    static async createArticle(title: string, text: string, snippet: string, tags: string): Promise<AxiosResponse> {
        return $api.post(`article/create`,
            {
                title: title,
                text: text,
                snippet: snippet,
                tags: tags,

            },)
    }
    static async editArticle(title: string, text: string, snippet: string, tags: string, article_id: string): Promise<AxiosResponse> {
        return $api.post(`article/edit`,
            {
                title: title,
                text: text,
                snippet: snippet,
                tags: tags,
                article_id: article_id 
            },)
    }
    static async approveCreateArticle(title: string): Promise<AxiosResponse> {
        return $api.post(`article/approve/create`, null,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    title: title,

                }
            },)
    }
    static async getOneArticle(slug: string, user_id: string | null): Promise<AxiosResponse<getOneArticleResponse>> {

        return axios.get<getOneArticleResponse>(`${API_URL}article/get/one`,
            {
                params: {
                    slug: slug,
                    user_id: user_id,
                }
            },
        )
    }

    static async getAllArticles(page: number | null, limit: number | null, sort: string | null, tag: string | null, user_id: string | null): Promise<AxiosResponse<ArticleResponseModel[]>> {

        return axios.get<ArticleResponseModel[]>(`${API_URL}article/get/all`,
            {
                params: {
                    page: page,
                    limit: limit,
                    sort: sort,
                    tag: tag,
                    user_id: user_id,
                }
            },
        )
    }

    static async getArticleCount(tag: string | null): Promise<AxiosResponse<PageCountResponseModel>> {

        return axios.get<PageCountResponseModel>(`${API_URL}article/all/count`,
            {
                params: {
                    tag: tag,
                }
            },
        )
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