import { makeAutoObservable } from "mobx";
import { getLocalToken } from "../utils/utils";
import { UserActivityResponse, UserLastReviews, UserListsResponse, UserResponseModel } from "../models/userModels";
import UserService from "../services/user-service";

export default class UserStore {
    isAuth = false;
    isLoading = false;
    isFollower = false;

    user = {} as UserResponseModel;
    userActivity = [] as UserActivityResponse[];
    list = [] as UserListsResponse[]
    addedList = [] as UserListsResponse[]
    reviews = [] as UserLastReviews[];

    constructor() {
        makeAutoObservable(this);
    }

    setAUser(user: UserResponseModel) {
        this.user = user;
    }
    setActivity(activity: UserActivityResponse[]) {
        this.userActivity = activity;
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

    async findUser(username: string, offset: number | null, limit: number | null) {
        this.setLoading(true);
        try {
            const user = await UserService.getUserProfile(username);
            this.setAUser(user.data)

        } catch (error) {
            this.setLoading(false);
            this.setAUser({} as UserResponseModel)
            return 1
        }try {
            if (getLocalToken() != null) {
                const follow = await UserService.checkFollow(this.user.id);
                this.setFollower(true)
            }
        } catch (error) {
            
        } try {
            const lists = await UserService.getUserLists(this.user.id)
            this.setLists(lists.data)
        } catch (error) {

        } try {
            const anotherLists = await UserService.getUserAddedLists(this.user.id)
            this.setAddedLists(anotherLists.data)
        } catch (error) {

        } try {

            const lists = await UserService.getUserNotPrivateLists(this.user.id)
            this.setLists(lists.data)

        } catch (error) {

        } try {

            const anotherLists = await UserService.getUserAddedLists(this.user.id)
            this.setAddedLists(anotherLists.data)

        } catch (error) {

        } try {
            const game = await UserService.getuserActivityGames(this.user.id, offset, limit)
            this.setActivity(game.data)

        } catch (error) {

        } try {
            const reviews = await UserService.getUserReviews(this.user.id, offset, limit)
            this.setReviews(reviews.data)
        } catch (error) {

        } finally {
            this.setLoading(false);
        }

    }

    async followController(username: string) {

        try {
            const user = await UserService.getUserProfile(username);
            const follow = await UserService.followUnfollowOnUser(user.data.id)

            if (follow.data == false) {
                this.setFollower(false)

            } if (follow.data == true) {
                this.setFollower(true)

            }
        } catch (error) {

        } try {
            const newUserData = await UserService.getUserProfile(username);
            this.setAUser(newUserData.data)
        } catch (error) {

        }
    }

    async getMyProfileFunc(user_id: string, offset: number | null, limit: number | null) {
        this.setLoading(true);
        try {
            const game = await UserService.getuserActivityGames(user_id, offset, limit)
            this.setActivity(game.data)
        } catch (error) {

        } try {
            const reviews = await UserService.getUserReviews(user_id, offset, limit)
            this.setReviews(reviews.data)
        } catch (error) {

        } finally {
            this.setLoading(false);
        }
    }

    async getUserListsFunc(user_id: string) {
        try {
            const lists = await UserService.getUserLists(user_id)
            this.setLists(lists.data)
        } catch (error) {

        } try {
            const anotherLists = await UserService.getUserAddedLists(user_id)
            this.setAddedLists(anotherLists.data)
        } catch (error) {

        }
    }

}