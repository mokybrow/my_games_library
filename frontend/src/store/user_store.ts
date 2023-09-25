import { makeAutoObservable } from "mobx";
import { AUser, IUser } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";


export default class UserStore {
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
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

}