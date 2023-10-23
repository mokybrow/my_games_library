import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, ListsGameResponse, UserActivityResponse, UserLastReviews, UserListsResponse, detail } from "../models/response";
import AuthService from "../service/AuthService";
import { getLocalToken, removeLocalToken, saveLocalToken } from "../utils/utils";
import { AxiosError } from "axios";
import GameService from "../service/GameService";
import UserService from "../service/UserService";


export default class AuthStore {
    user = {} as IUser;
    userActivity = [] as UserActivityResponse[];
    isAuth = false;
    isLoading = false;
    reviews = [] as UserLastReviews[];
    loginError = false;

    list = [] as UserListsResponse[]
    addedList = [] as UserListsResponse[]

    wantedGames = [] as ListsGameResponse[];
    likedGames = [] as ListsGameResponse[];
    passedGames = [] as ListsGameResponse[];

    constructor() {
        makeAutoObservable(this);
    }
    setReviews(reviews: UserLastReviews[]) {
        this.reviews = reviews;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLists(list: UserListsResponse[]) {
        this.list = list;
    }

    setAddedLists(addedList: UserListsResponse[]) {
        this.addedList = addedList;
    }

    setGames(games: UserActivityResponse[]) {
        this.userActivity = games;
    }

    setWantGames(games: ListsGameResponse[]) {
        this.wantedGames = games;
    }
    setLikedGames(games: ListsGameResponse[]) {
        this.likedGames = games;
    }
    setPassedGames(games: ListsGameResponse[]) {
        this.passedGames = games;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setLoginError(bool: boolean) {
        this.loginError = bool;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            saveLocalToken(response.data.access_token);
            this.setAuth(true);
            const getMe = await AuthService.getMyProfile();
            this.setUser(getMe.data);
            this.setLoginError(false);
        } catch (e) {
            this.setLoginError(true);
        }
    }

    async registr(email: string, password: string, username: string, name: string) {
        try {
            await AuthService.registration(email, password, username, name);

        } catch (e) {
            const err = e as AxiosError<detail>

        }
    }

    async logout() {
        try {
            await AuthService.logout();
            removeLocalToken();
            this.setAuth(false);
            this.setUser({} as IUser);
            window.location.reload();
        } catch (e) {
        }
    }
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.getMyProfile();
            this.setUser(response.data)
            this.setAuth(true);

        } catch (error) {

        } finally {
            this.setLoading(false);
        }
        return this.user.username
    }
    async getMyProfileFunc() {
        this.setLoading(true);
        try {
            const game = await UserService.getuserActivityGames(this.user.id)
            this.setGames(game.data)
        } catch (error) {

        } try {
            const reviews = await UserService.getUserReviews(this.user.id)
            this.setReviews(reviews.data)
        } catch (error) {

        } finally {
            this.setLoading(false);
        }
    }
    async getUserListsFunc(){
        try {
            const lists = await UserService.getUserLists(this.user.id)
            this.setLists(lists.data)
        } catch (error) {

        } try {
            const anotherLists = await UserService.getUserAddedLists(this.user.id)
            this.setAddedLists(anotherLists.data)
        } catch (error) {

        } 
    }
}