import { makeAutoObservable } from "mobx";
import { AUser, IUser } from "../models/response";
import AuthService from "../service/AuthService";
import {  removeLocalToken, saveLocalToken } from "../utils/utils";
import { AxiosError } from "axios";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
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

            this.setUser(getMe.data)
        } catch (e) {
            console.log("login error");
        }

    }

    async registr(email: string, password: string, username: string, name: string) {
        try {
            const response = await AuthService.registration(email, password, username, name);
            console.log(response.data)
            this.setAuth(true);
        } catch (e) {
            console.log("login error");
        }

    }

    async logout() {
        try {
            await AuthService.logout();
            removeLocalToken()
            this.setAuth(false);
        } catch (e) {
            console.log("login error");
        }

    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.getMe();
            this.setUser(response.data)
            console.log(response.data)
            this.setAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    async CheckMyProfile(username: string){
        this.setLoading(true);
        try {
            const me = await AuthService.getMe();
            const user = await AuthService.getUser(username);
            this.setAUser(user.data)
            this.setUser(me.data)
        } catch (error) {
            const err = error as AxiosError
        }finally {
            this.setLoading(false);
        }
    }

}