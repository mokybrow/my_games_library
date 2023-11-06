import { makeAutoObservable } from "mobx";
import SearchService from "../services/search-service";
import { SearchItemResponse } from "../models/searchModel";


export default class SearchStore {
    isLoading = false;

    items = [] as SearchItemResponse[];

    constructor() {
        makeAutoObservable(this);
    }


    setItems(games: SearchItemResponse[]) {
        this.items = games;
    }
    
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async searchFunc(tag: string, title: string) {
        this.setLoading(true);
        try {
            const response = await SearchService.searchItem(tag, title);
            this.setItems(response.data)

        } catch (error) {
            this.setItems([] as SearchItemResponse[])
            //const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}