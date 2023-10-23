import { makeAutoObservable } from "mobx";
import { AUser, GamesResponse, IUser, RegEmailCheck, UserActivityResponse, UserLastReviews, UserListsResponse, UserStat } from "../models/response";
import SearchService from "../service/SearchService";


export default class SearchStore {
    isLoading = false;

    games = [] as GamesResponse[];

    constructor() {
        makeAutoObservable(this);
    }


    setGames(games: GamesResponse[]) {
        this.games = games;
    }
    
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async searchGameFunc(title: any) {
        this.setLoading(true);
        try {
            const response = await SearchService.searchGame(title);
            this.setGames(response.data)

        } catch (error) {
            this.setGames([] as GamesResponse[])
            //const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}