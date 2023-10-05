import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, RegEmailCheck, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";


export default class UserStore {
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;


    isFollower = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
    }



    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setFollower(bool: boolean) {
        this.isFollower = bool;
    }

    async findUser(username: string) {
        this.setLoading(true);
        try {
            const user = await UserService.getUserProfile(username);
            this.setAUser(user.data)
            const follow = await UserService.checkFollow(this.anotherUser.id);
            if (follow.status === 200){
                this.setFollower(true)
            }
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    // async checkFollow(user_id: string) {
    //     if (this.isLoading !== false) {
    //         try {
    //             const follow = await UserService.checkFollow(user_id);
    //             this.setFollower(follow.data.follow)
    //         } catch (error) {
    //             const err = error as AxiosError
    //         }
    //     }
    // }
}