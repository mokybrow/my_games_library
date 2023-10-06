import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, detail } from "../models/response";
import AuthService from "../service/AuthService";
import { removeLocalToken, saveLocalToken } from "../utils/utils";
import { AxiosError } from "axios";
import GameService from "../service/GameService";


export default class AuthStore {
    user = {} as IUser;
    games = [] as GamesResponse[];
    isAuth = false;
    isLoading = false;

    loginError = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
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
            const game = await GameService.getUserGames(response.data.id)
            this.setGames(game.data)
        } catch (error) {
        } finally {
            this.setLoading(false);
        }
    }
}