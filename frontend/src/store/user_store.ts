import { makeAutoObservable } from "mobx";
import { AUser, IUser } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";


export default class UserStore {
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;
    anotherUser2 = {} as AUser;

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
    }

    setAUser2(user: AUser) {
        this.anotherUser2 = user;
    }


    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async FindUser(username: string) {
        this.setLoading(true);
        try {
            const user = await AuthService.getUser(username);
            this.setAUser(user.data)
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    async FindUserEmail(email: string) {
        this.setLoading(true);
        try {
            const user = await AuthService.getUserEmail(email);
            this.setAUser2(user.data)
            console.log(this.anotherUser2)
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}