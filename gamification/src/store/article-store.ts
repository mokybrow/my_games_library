import { makeAutoObservable } from "mobx";
import { AxiosError } from "axios";

import { getLocalToken } from "../utils/utils";
import { ArticleResponseModel } from "../models/articleModels";
import AuthService from "../services/auth-service";
import ArticleService from "../services/article-service";


export default class ArticleStore {

    isLoading = false;
    pageCount = 0;

    articles = [] as ArticleResponseModel[];



    constructor() {
        makeAutoObservable(this);
    }

    setPageCount(count: number) {
        this.pageCount = count
    }
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setArticles(articles: ArticleResponseModel[]) {
        this.articles = articles
    }

    async createArticleFunc(title: string, text: string, tags: string, cover: any) {
        this.setLoading(true);
        try {
            const response = await ArticleService.createArticle(title, text, tags, cover);
            // await ListService.addListCover(String(response.data.detail), img);

        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    async getAllArticleFunc(page: number | null, limit: number | null, sort: string | null, tag: string | null) {
        this.setLoading(true);
        try {
            if (getLocalToken()) {
                const user = await AuthService.getMyProfile();
                const response = await ArticleService.getAllArticles(page, limit,sort,tag, String(user.data.id));
                this.setArticles(response.data)
            } else {
                const response = await ArticleService.getAllArticles(page, limit, sort,tag, null);
                this.setArticles(response.data)
            }

        } catch (error) {
            const err = error as AxiosError
        }try {
            const response = await ArticleService.getArticleCount(tag);
            this.setPageCount(response.data.count)
        } catch (error) {
            
        } finally {
            this.setLoading(false);
        }
    }


    async likeArticle(article_id: string, page: number | null, limit: number | null, sort: string | null, tag:string | null,) {

        try {

            await ArticleService.likeArticle(article_id)
            if (getLocalToken()) {
                const user = await AuthService.getMyProfile();
                const response = await ArticleService.getAllArticles(page, limit, sort,tag, user.data.id);
                this.setArticles(response.data)
            } else {
                const response = await ArticleService.getAllArticles(page, limit, sort,tag, null);
                this.setArticles(response.data)
            }


        } catch (error) {
            // const err = error as AxiosError
        }
    }

}