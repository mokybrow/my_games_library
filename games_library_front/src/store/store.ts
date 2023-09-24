import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import { api } from "../api/api";

class UserStore {
    user: User[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getUser = async () => {
        try {
            this.isLoading = true;
            const res = await api.getUser();
            this.user = res;
            this.isLoading = false;

        } catch (err) {
            console.log("login error");
            console.log(err)
        }
    }
}

export default new UserStore();