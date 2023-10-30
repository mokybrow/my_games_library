import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, ListsGameResponse, RegEmailCheck, UserActivityResponse, UserLastReviews, UserListsResponse, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";
import AuthStore from "./auth_store";
import { getLocalToken } from "../utils/utils";
import ListService from "../service/ListService";
import ArticleService from "../service/ArticleService";
import { ArticleResponseModel } from "../models/articlesModels";

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

    async getAllArticleFunc(offset: number | null, limit: number | null, popular: boolean | null, date: boolean | null) {
        this.setLoading(true);
        try {
            if (getLocalToken()) {
                const user = await AuthService.getMyProfile();
                const response = await ArticleService.getAllArticles(offset, limit, popular, date, String(user.data.id));
                this.setArticles(response.data)
            } else {
                const response = await ArticleService.getAllArticles(offset, limit, popular, date, null);
                this.setArticles(response.data)
            }

        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
    async getAllArticlePageCountFunc(limit: number) {

        try {
            const response = await ArticleService.getArticleCount(limit);
            this.setPageCount(response.data.count)

        } catch (error) {
            const err = error as AxiosError
        }
    }

    async likeArticle(article_id: string, offset: number | null, limit: number | null, popular: boolean | null, date: boolean | null) {

        try {

            await ArticleService.likeArticle(article_id)
            if (getLocalToken()) {
                const user = await AuthService.getMyProfile();
                const response = await ArticleService.getAllArticles(offset, limit, popular, date, user.data.id);
                this.setArticles(response.data)
            } else {
                const response = await ArticleService.getAllArticles(offset, limit, popular, date, null);
                this.setArticles(response.data)
            }


        } catch (error) {
            // const err = error as AxiosError
        }
    }

}