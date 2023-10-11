import { makeAutoObservable } from "mobx";
import { GameAvgRate, GameProfileResponse, GameReviews,  GamesResponse, userGrade } from "../models/response";
//import { AxiosError } from "axios";

import GameService from "../service/GameService";



export default class GamesStore {
    isLoading = false;

    games = [] as GamesResponse[];
    gamesPage = [] as GamesResponse[];
    reviews = [] as GameReviews[];
    gameProfile = {} as GameProfileResponse;
    gameAvgRate = {} as GameAvgRate;
    userGrade = {} as userGrade;
    pageCount = 0;
    currentPage = 0;
    isWanted = false;
    isPassed = false;
    isLiked = false;

    constructor() {
        makeAutoObservable(this);
    }

    setPageCount(count: number) {
        this.pageCount = count
    }
    setGames(games: GamesResponse[]) {
        this.games = games;
    }
    setGamesPage(games: GamesResponse[]) {
        this.gamesPage = games;
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

    setUserGrade(number: userGrade) {
        this.userGrade = number;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    setPassed(bool: boolean) {
        this.isPassed = bool;
    }


    setLiked(bool: boolean) {
        this.isLiked = bool;
    }

    setWanted(bool: boolean) {
        this.isWanted = bool;
    }


    async getGameData(slug: string) {
        this.setLoading(true);
        try {
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)
            const avgRate = await GameService.getGamesAvgRate(response.data.id)
            this.setAvgRate(avgRate.data)

            const checkInPassed = await GameService.checkInPassedList(response.data.id)

            if (checkInPassed.data === true) {
                this.setPassed(true)
            }
            const checkInWanted = await GameService.checkInWantedList(response.data.id)
            if (checkInWanted.data === true) {
                this.setWanted(true)
            }
            const checkInLiked = await GameService.checkInLikedList(response.data.id)

            if (checkInLiked.data === true) {
                this.setLiked(true)
            }
            const reviews = await GameService.getGamesReview(response.data.id)
            this.setGameReviews(reviews.data)


            const userGrade = await GameService.getUserGrade(response.data.id)
            this.setUserGrade(userGrade.data)

            if (userGrade.data === null) {
                this.setUserGrade({
                    id: 'string',
                    user_id: 'string',
                    game_id: 'string',
                    grade: 0,
                    comment: 'string',
                    created_at: response.data.release
                })
            }


        } catch (error) {
            //const err = error as AxiosError
            this.setGameReviews([])
        } finally {
            this.setLoading(false);

        }

    }
    async getGameByPage(id: number) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamesPages(Number(id));
            this.setGamesPage(response.data)

        } catch (error) {
            //const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
    async getPageCount() {
        this.setLoading(true);
        try {
            const response = await GameService.getGamesCount();
            this.setPageCount(response.data.count/36)

        } catch (error) {
            //const err = error as AxiosError
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
           // const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
}