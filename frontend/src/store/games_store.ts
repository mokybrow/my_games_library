import { makeAutoObservable } from "mobx";
import {GameAvgRate, GameProfileResponse, GameReviews, GamesResponse } from "../models/response";
import { AxiosError } from "axios";

import GameService from "../service/GameService";



export default class GamesStore {
    isLoading = false;
    games = [] as GamesResponse[];
    reviews = [] as GameReviews[];
    gameProfile = {} as GameProfileResponse;
    gameAvgRate = {} as GameAvgRate;
    
    constructor() {
        makeAutoObservable(this);
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
    }

    setAvgRate(gameAvgRate: GameAvgRate) {
        this.gameAvgRate = gameAvgRate;
    }

    setGameReviews(reviews: GameReviews[]) {
        this.reviews = reviews;
    }

    setGameProfile(gameProfile: GameProfileResponse) {
        this.gameProfile = gameProfile;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async getGameData(slug: string){
        this.setLoading(true);
        try {
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

            const avgRate = await GameService.getGamesAvgRate(response.data.id)
            this.setAvgRate(avgRate.data)

            const reviews = await GameService.getGamesReview(response.data.id)
            this.setGameReviews(reviews.data)
        } catch (error) {
            const err = error as AxiosError
            this.setGameReviews([])
        } finally {
            this.setLoading(false);
        }
        
    }

    async getNewstGame() {
        this.setLoading(true);
        try {
            const response = await GameService.getNewGames();
            this.setGames(response.data)
        } catch (error) {
            const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}