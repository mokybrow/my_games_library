import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, UserActivityResponse,  UserLastReviews, UserListsResponse, detail } from "../models/response";
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
    userImg = '';
    list = [] as UserListsResponse[]
    addedList = [] as UserListsResponse[]

    constructor() {
        makeAutoObservable(this);
    }
    setReviews(reviews: UserLastReviews[]) {
        this.reviews = reviews;
    }
    setUserImg(user: string) {
        this.userImg = user;
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
            const getMe = await AuthService.getUserInfo();
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

            const response = await AuthService.getUserInfo();
            this.setUser(response.data)
            this.setAuth(true);

            const lists = await UserService.getUserLists(response.data.id)
            this.setLists(lists.data)

            const anotherLists = await UserService.getUserAddedLists(response.data.id)
            this.setAddedLists(anotherLists.data)

            const img = await UserService.getUserImg(response.data.id)
            this.setUserImg(img.data)


            const game = await GameService.getUserGames(response.data.id)
            this.setGames(game.data)

            const reviews = await UserService.getUserReviews(response.data.id)
            this.setReviews(reviews.data)
        } catch (error) {
        } finally {
            this.setLoading(false);
        }
    }
}