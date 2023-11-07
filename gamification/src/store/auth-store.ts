import { makeAutoObservable } from "mobx";

import { removeLocalToken, saveLocalToken } from "../utils/utils";
import AuthService from "../services/auth-service";
import { IUserModel } from "../models/userModels";



export default class AuthStore {
    user = {} as IUserModel;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUserModel) {
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
            const getMe = await AuthService.getMyProfile();
            this.setUser(getMe.data);

        } catch (e) {

        }
    }

    async registr(email: string, password: string, username: string, name: string) {
        try {
            await AuthService.registration(email, password, username, name);

        } catch (e) {

        }
    }

    async logout() {
        try {
            await AuthService.logout();
            removeLocalToken();
            this.setAuth(false);
            this.setUser({} as IUserModel);
           
        } catch (e) {

        }
        finally{
            window.location.reload();
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

    async emailVerify(token: string){
        try {
            await AuthService.veirifyEmailFunc(String(token))

        } catch (error) {
            
        }
    }
}