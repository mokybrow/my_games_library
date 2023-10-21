import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, ListsGameResponse, RegEmailCheck, UserActivityResponse, UserLastReviews, UserListsResponse, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";
import AuthStore from "./auth_store";
import { getLocalToken } from "../utils/utils";
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

    listData = {} as UserListsResponse;

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

    setListData(listData: UserListsResponse) {
        this.listData = listData
    }

    setListGames(games: ListsGameResponse[]) {
        this.ListsGames = games
    }


    async CreateList(name: string, desctiption: string, isPrivate: boolean, img: any) {
        this.setLoading(true);
        try {
            const response = await ListService.createList(name, desctiption, isPrivate, img);
            // await ListService.addListCover(String(response.data.detail), img);

        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    async getListPageGames( slug: string) {
        this.setLoading(true);
        try {
            const list = await ListService.getListData(slug)
            this.setListData(list.data)


        } catch (error) {
            const err = error as AxiosError
            this.setListGames([])
        } try {

            const response = await ListService.getListGames(slug)
            this.setListGames(response.data)

        } catch (error) {

        } try {

        } catch (error) {

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