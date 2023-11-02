import { makeAutoObservable } from "mobx";
import { AxiosError } from "axios";
import ListService from "../services/list-service";
import AuthService from "../services/auth-service";
import { UserActivityResponse, UserLastReviews, UserListsResponse } from "../models/userModels";
import { ListsGameResponse } from "../models/listModels";


export default class ListStore {
    isAuth = false;
    isLoading = false;
    addedList = false;

    anotherUserImg = '';
    userActivity = [] as UserActivityResponse[];
    reviews = [] as UserLastReviews[];
    isFollower = false;
    ListsGames = [] as ListsGameResponse[];
    pageCount = 0;
    listData = {} as UserListsResponse;

    allLists = [] as UserListsResponse[];

    constructor() {
        makeAutoObservable(this);
    }

    setPageCount(count: number) {
        this.pageCount = count
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

    setAllLists(allLists: UserListsResponse[]) {
        this.allLists = allLists
    }


    async CreateList(name: string, desctiption: string | null, isPrivate: boolean, img: any) {
        this.setLoading(true);
        try {
            await ListService.createList(name, desctiption, isPrivate, img);

        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    async getListPageGames(slug: string) {
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
            const user_data = await AuthService.getMyProfile();
            await ListService.AddDeleteListToMy(slug, user_data.data.id);
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }

    }

    async getAllLists() {
        this.setLoading(true);
        try {
            const allLists = await ListService.getAllLists();
            this.setAllLists(allLists.data)
        } catch (error) {
            const err = error as AxiosError
        } try {
            const response = await ListService.geListsCount();
            this.setPageCount(response.data.count / 36)

        } catch (error) {
            //const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}