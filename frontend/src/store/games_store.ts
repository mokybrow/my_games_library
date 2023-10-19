import { makeAutoObservable } from "mobx";
import { GameAvgRate, GameProfileResponse, GameReviews, GamesResponse, userGrade } from "../models/response";
//import { AxiosError } from "axios";

import GameService from "../service/GameService";
import { getLocalToken } from "../utils/utils";



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
    sort = 'null';
    genre = 'null';

    constructor() {
        makeAutoObservable(this);
    }

    setSort(sort: string) {
        this.sort = sort
    }
    setGenre(genre: string) {
        this.genre = genre
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

            if (getLocalToken() !== null) {
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
            }

            if (getLocalToken() === null) {
                const reviews_unauth = await GameService.getGamesReviewUnAuth(response.data.id)
                this.setGameReviews(reviews_unauth.data)
            }


        } catch (error) {
            //const err = error as AxiosError

            this.setGameReviews([])
        } 
        try {
            const response = await GameService.getGameBySlug(String(slug));

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
            
        } catch (error) 
        {
            
        }finally {

            this.setLoading(false);

        }

    }
    async getGameByPage(id: number, sort: string | null, decade: string | null, genre: string | null) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamesPages(Number(id), sort, decade, genre);
            this.setGamesPage(response.data)

        } catch (error) {
            //const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }
    async getPageCount(sort: string | null, decade: string | null, genre: string | null) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamesCount(sort, decade, genre);
            this.setPageCount(response.data.count / 36)

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

    async likeReview(review_id: string, slug: string) {
        this.setLoading(true);
        try {
            await GameService.likeToUserComment(String(review_id))
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

            const avgRate = await GameService.getGamesAvgRate(response.data.id)
            this.setAvgRate(avgRate.data)

            const reviews = await GameService.getGamesReview(response.data.id)
            this.setGameReviews(reviews.data)


        } catch (error) {
            // const err = error as AxiosError
        } finally {
            this.setLoading(false);
        }
    }

    async addReview(id: string, grade: number, comment: string | null, slug: string) {
        this.setLoading(true);
        try {

            await GameService.addReview(id, grade, comment)

            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

            const avgRate = await GameService.getGamesAvgRate(response.data.id)
            this.setAvgRate(avgRate.data)

        } catch (error) {
            // const err = error as AxiosError
        } 
        try {
            const response = await GameService.getGameBySlug(String(slug));
            const userGrade = await GameService.getUserGrade(response.data.id)
            this.setUserGrade(userGrade.data)
        } catch (error) {
            this.setUserGrade({} as userGrade)

        }
        try {
            const response = await GameService.getGameBySlug(String(slug));
            const reviews = await GameService.getGamesReview(response.data.id)
            this.setGameReviews(reviews.data)
        } catch (error) {
            this.setGameReviews([] as GameReviews[])
        }finally {
            this.setLoading(false);
        }
    }

    async deleteReview(id: string, slug: string) {
        this.setLoading(true);
        try {
            await GameService.deleteUserRate(id)
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)
            const avgRate = await GameService.getGamesAvgRate(response.data.id)
            this.setAvgRate(avgRate.data)

        } catch (error) {
            // const err = error as AxiosError
            this.setAvgRate({} as GameAvgRate)
        } 
        try {
            const response = await GameService.getGameBySlug(String(slug));
            const reviews = await GameService.getGamesReview(response.data.id)
            this.setGameReviews(reviews.data)

        } catch (error) {
            this.setGameReviews([] as GameReviews[])
        }
        try {
            const response = await GameService.getGameBySlug(String(slug));
            const userGrade = await GameService.getUserGrade(response.data.id)
            this.setUserGrade(userGrade.data)
        } catch (error) {
            this.setUserGrade({} as userGrade)
        }finally {
            this.setLoading(false);
        }
    }
}