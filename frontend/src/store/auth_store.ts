import { makeAutoObservable } from "mobx";
import { AUser, IUser } from "../models/response";
import AuthService from "../service/AuthService";
import { removeLocalToken, saveLocalToken } from "../utils/utils";
import { AxiosError } from "axios";


export default class AuthStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;


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



    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);

            saveLocalToken(response.data.access_token);
            this.setAuth(true);
            const getMe = await AuthService.getMe();
            this.setUser(getMe.data);
            return 'success'
        } catch (e) {

            console.log("login error");
        }

    }

    async registr(email: string, password: string, username: string, name: string) {
        try {
            const response = await AuthService.registration(email, password, username, name);
            this.setAuth(true);
        } catch (e) {
            console.log("login error");
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