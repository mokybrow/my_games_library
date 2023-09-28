import { makeAutoObservable } from "mobx";
import { AUser, IUser, detail } from "../models/response";
import AuthService from "../service/AuthService";
import { removeLocalToken, saveLocalToken } from "../utils/utils";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";



export default class AuthStore {
    user = {} as IUser;
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
            const getMe = await AuthService.getMe();
            this.setUser(getMe.data);
            this.setLoginError(false);
        } catch (e) {
            this.setLoginError(true);
            console.log("login error");
        }

    }

    async registr(email: string, password: string, username: string, name: string) {
        try {
            await AuthService.registration(email, password, username, name);


        } catch (e) {
            const err = e as AxiosError<detail>
            console.log(err.response?.data.detail);


            }    }

    async logout() {
        try {
            await AuthService.logout();
            removeLocalToken();
            this.setAuth(false);
            this.setUser({} as IUser);
            window.location.reload();
        } catch (e) {
            console.log("login error");
        }

    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.getMe();
            this.setUser(response.data)
            this.setAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

}