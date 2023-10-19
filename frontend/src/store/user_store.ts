import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, RegEmailCheck, UserActivityResponse, UserLastReviews, UserListsResponse, UserStat } from "../models/response";
import AuthService from "../service/AuthService";
import { AxiosError } from "axios";
import UserService from "../service/UserService";
import GameService from "../service/GameService";
import AuthStore from "./auth_store";
import { getLocalToken } from "../utils/utils";
import { decode as base64_decode, encode as base64_encode } from 'base-64';

export default class UserStore {
    isAuth = false;
    isLoading = false;
    anotherUser = {} as AUser;
    anotherUserImg = '';
    userActivity = [] as UserActivityResponse[];
    reviews = [] as UserLastReviews[];
    isFollower = false;
    list = [] as UserListsResponse[]
    addedList = [] as UserListsResponse[]

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: AUser) {
        this.anotherUser = user;
    }

    setAUserImg(user: string) {
        this.anotherUserImg = user;
    }

    setGames(games: UserActivityResponse[]) {
        this.userActivity = games;
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

    setLists(list: UserListsResponse[]) {
        this.list = list;
    }
    setAddedLists(addedList: UserListsResponse[]) {
        this.addedList = addedList;
    }

    async findUser(username: string) {
        this.setLoading(true);
        try {
            const user = await UserService.getUserProfile(username);
            this.setAUser(user.data)

            if (getLocalToken() != null) {
                const follow = await UserService.checkFollow(user.data.id);

                if (follow.status === 200) {
                    this.setFollower(true)
                }
            }

        } catch (error) {
            const err = error as AxiosError
        } try {
            const img = await UserService.getUserImg(this.anotherUser.id)
            this.setAUserImg(img.data)
        } catch (error) {

        } try {
            const lists = await UserService.getUserLists(this.anotherUser.id)
            this.setLists(lists.data)

        } catch (error) {

        } try {

            const anotherLists = await UserService.getUserAddedLists(this.anotherUser.id)
            this.setAddedLists(anotherLists.data)

        } catch (error) {

        } try {
            const game = await GameService.getUserGames(this.anotherUser.id)
            this.setGames(game.data)

        } catch (error) {

        } try {
            const reviews = await UserService.getUserReviews(this.anotherUser.id)
            this.setReviews(reviews.data)
        } catch (error) {

        } finally {
            this.setLoading(false);
        }

    }

    async followController(username: string) {
        this.setLoading(true);
        try {
            const user = await UserService.getUserProfile(username);
            const follow = await UserService.followUnfollowOnUser(user.data.id)
            const newUserData = await UserService.getUserProfile(username);
            this.setAUser(newUserData.data)
            if (follow.data == false) {
                this.setFollower(false)

            } if (follow.data == true) {
                this.setFollower(true)

            }
        } catch (error) {

        } finally {
            this.setLoading(false);
        }
    }

}