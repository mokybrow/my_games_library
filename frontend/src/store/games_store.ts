import { makeAutoObservable } from "mobx";
import { GameAvgRate, GameReviews, GamesResponse, userGrade } from "../models/response";
//import { AxiosError } from "axios";

import GameService from "../service/GameService";
import { getLocalToken } from "../utils/utils";
import { GameProfileResponse } from "../models/gamesModels";
import AuthService from "../service/AuthService";
import ReviewService from "../service/ReviewService";
import { ReviewCardModel } from "../models/reviewModels";



export default class GamesStore {
    isLoading = false;

    games = [] as GamesResponse[];
    gamesPage = [] as GamesResponse[];

    gameProfile = {} as GameProfileResponse;
    userGrade = {} as userGrade;
    pageCount = 0;
    currentPage = 0;
    isWanted = false;
    isPassed = false;
    isLiked = false;
    sort = 'null';
    genre = 'null';

    reviews = [] as ReviewCardModel[];

    constructor() {
        makeAutoObservable(this);
    }

    setReviews(review: ReviewCardModel[]) {
        this.reviews = review;
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

    async getReviewsFunc(offset: number | null, limit: number | null, popular: boolean | null, slug: string | null) {
        this.setLoading(true);
        try {
            if (getLocalToken()) {
                const user = await AuthService.getMyProfile();
                const response = await ReviewService.getReviews(offset, limit, popular, String(user.data.id), slug);
                this.setReviews(response.data)
            }else{
                const response = await ReviewService.getReviews(offset, limit, popular, null, slug);
                this.setReviews(response.data)
            }
        } catch (error) {

        } try {
            const response = await GameService.getGameBySlug(String(slug));
            const userGrade = await GameService.getUserGrade(response.data.id)
            this.setUserGrade(userGrade.data)
        } catch (error) {
            this.setUserGrade({} as userGrade)
        } try {
            if (popular != true) {
                const response = await ReviewService.getReviewsCount();
                this.setPageCount(response.data.count / 36)
            }
        } catch (error) {

        } finally {
            this.setLoading(false);
        }
    }

    async getGameData(slug: string) {
        this.setLoading(true);
        try {
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

        } catch (error) {
        } try {
            if (getLocalToken() !== null) {
                const checkInPassed = await GameService.checkInPassedList(this.gameProfile.id)
                if (checkInPassed.data === true) {
                    this.setPassed(true)
                }
            }
        } catch (error) {
            this.setPassed(false)
        } try {
            if (getLocalToken() !== null) {
                const checkInPassed = await GameService.checkInLikedList(this.gameProfile.id)
                if (checkInPassed.data === true) {
                    this.setLiked(true)
                }
            }
        } catch (error) {
            this.setLiked(false)
        } try {
            if (getLocalToken() !== null) {
                const checkInPassed = await GameService.checkInWantedList(this.gameProfile.id)
                if (checkInPassed.data === true) {
                    this.setWanted(true)
                }
            }
        } catch (error) {
            this.setWanted(false)
        }
        try {

            const userGrade = await GameService.getUserGrade(this.gameProfile.id)
            this.setUserGrade(userGrade.data)

            if (userGrade.data === null) {
                this.setUserGrade({
                    id: 'string',
                    user_id: 'string',
                    game_id: 'string',
                    grade: 0,
                    comment: 'string',
                    created_at: this.gameProfile.release
                })
            }

        } catch (error) {

        } finally {

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

    async addReview(id: string, grade: number, comment: string | null, slug: string) {
        try {
            await GameService.addReview(id, grade, comment)

        } catch (error) {
            // const err = error as AxiosError
        } try {
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

        } catch (error) {
            this.setUserGrade({} as userGrade)
        }
        try {
            const reviews = await ReviewService.getReviews(0, 6, false, null, slug);
            this.setReviews(reviews.data)
        } catch (error) {

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
            // const reviews = await GameService.getGamesReview(response.data.id)
            // this.setGameReviews(reviews.data)
        } catch (error) {
            this.setReviews([] as ReviewCardModel[])
        }
    }

    async deleteReview(id: string, slug: string) {
        try {
            await GameService.deleteUserRate(id)
        } catch (error) {
            // const err = error as AxiosError

        }
        try {
            const reviews = await ReviewService.getReviews(0, 6, false, null, slug);
            this.setReviews(reviews.data)
        } catch (error) {
            this.setReviews([] as ReviewCardModel[])
        }

        try {
            const response = await GameService.getGameBySlug(String(slug));
            this.setGameProfile(response.data)

        } catch (error) {
            this.setUserGrade({} as userGrade)
        } try {
            const userGrade = await GameService.getUserGrade(this.gameProfile.id)
            this.setUserGrade(userGrade.data)

        } catch (error) {

        }
        try {
            const userGrade = await GameService.getUserGrade(this.gameProfile.id)
            this.setUserGrade(userGrade.data)
        } catch (error) {
            this.setUserGrade({} as userGrade)
        }
    }
    async likeReview(offset: number | null, limit: number | null, popular: boolean | null, review_id: string, slug: string | null) {

        try {
            await ReviewService.likeToUserComment(String(review_id))
            if (getLocalToken()) {
                if (slug !== null) {
                    const user = await AuthService.getMyProfile();
                    const response = await ReviewService.getReviews(offset, limit, popular, String(user.data.id), slug);
                    this.setReviews(response.data)
                }
                else {
                    const user = await AuthService.getMyProfile();
                    const response = await ReviewService.getReviews(offset, limit, popular, String(user.data.id), null);
                    this.setReviews(response.data)
                }

            } else {
                if (slug !== null) {
                    const response = await ReviewService.getReviews(offset, limit, popular, null, slug);
                    this.setReviews(response.data)
                }
                else {
                    const response = await ReviewService.getReviews(offset, limit, popular, null, null);
                    this.setReviews(response.data)
                }
            }

        } catch (error) {
            // const err = error as AxiosError
        }
    }
}