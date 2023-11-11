import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

import { PageCountResponseModel } from "../models/generalModels";
import { ArticleResponseModel } from "../models/articleModels";

export default class ArticleService {

    static async createArticle(title: string, text: string, tags: string, cover: any): Promise<AxiosResponse> {
        console.log(cover)
        return $api.post(`article/create`,  { title: title, text: text, tags: tags}) 

        if (cover == ''){
            return $api.post(`article/create`,  { title: title, text: text, tags: tags, cover: null}) 

        }
        else{
            return $api.post(`article/create`,  { title: title, text: text, tags: tags, cover: cover}) 

        }

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
    static async getOneArticle(slug: string, user_id: string | null): Promise<AxiosResponse<ArticleResponseModel>> {

        return axios.get<ArticleResponseModel>(`${API_URL}article/get/one`,
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