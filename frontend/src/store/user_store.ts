import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, RegEmailCheck, UserLastReviews, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";
import AuthStore from "./auth_store";
import { getLocalToken } from "../utils/utils";


export default class UserStore {
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;
    games = [] as GamesResponse[];
    reviews = [] as UserLastReviews[];
    isFollower = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
    }

    setReviews(reviews: UserLastReviews[]) {
        this.reviews = reviews;
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
            const game = await GameService.getUserGames(user.data.id)
            this.setGames(game.data)
            const reviews = await UserService.getUserReviews(user.data.id)
            this.setReviews(reviews.data)
            if (getLocalToken() !== null){
                const response = await AuthService.getUserInfo();
                if (response.status !== 401){
                    const follow = await UserService.checkFollow(this.anotherUser.id);
                    console.log(follow.data.detail)
                    if (follow.status === 200) {
                        this.setFollower(true)
                    }
                }
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