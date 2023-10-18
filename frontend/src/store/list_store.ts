import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, ListsGameResponse, RegEmailCheck, UserActivityResponse, UserLastReviews, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";
import AuthStore from "./auth_store";
import { getLocalToken } from "../utils/utils";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import ListService from "../service/ListService";

export default class ListStore {
    isAuth = false;
    isLoading = false;
    addedList = false;
    anotherUser = {} as AUser;
    anotherUserImg = '';
    userActivity = [] as UserActivityResponse[];
    reviews = [] as UserLastReviews[];
    isFollower = false;
    ListsGames = [] as ListsGameResponse[];

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setAddedList(bool: boolean) {
        this.addedList = bool;
    }

    setListGames(games: ListsGameResponse[]) {
        this.ListsGames = games
    }


    async CreateList(name: string, desctiption: string, isPrivate: boolean, img: any) {
        this.setLoading(true);
        try {
            const response = await ListService.createList(name, desctiption, isPrivate);
            await ListService.addListCover(String(response.data.list_created), img);

        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
            window.location.reload();
        }
    }


    async getListPageGames(slug: string) {
        this.setLoading(true);
        try {
            const user_data = await AuthService.getUserInfo();
            const response = await ListService.getListGames(slug)
            this.setListGames(response.data)

            const checkAdded = await ListService.checkAdded(slug, user_data.data.id)
            if (checkAdded.data.user_id) {
                this.setAddedList(true)
            }

        } catch (error) {
            const err = error as AxiosError
            this.setListGames([])
        } finally {
            this.setLoading(false);
        }
    }

    async addDeleteList(slug: string) {
        this.setLoading(true);
        try {
            const user_data = await AuthService.getUserInfo();
            await ListService.AddDeleteListToMy(slug, user_data.data.id);
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }

    }
}