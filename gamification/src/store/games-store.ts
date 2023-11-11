import { makeAutoObservable } from "mobx";
import { GameProfileResponse, GamesResponse } from "../models/gameModels";
import { userGrade } from "../models/userModels";
import { ReviewCardModel } from "../models/reviewModels";
import { CheckGameInDefaultListsResponseModel, CheckGameInUserListsResponseModel } from "../models/listModels";
import { getLocalToken } from "../utils/utils";
import AuthService from "../services/auth-service";
import ReviewService from "../services/review-service";
import GameService from "../services/game-service";
import ListService from "../services/list-service";



export default class GamesStore {
    isLoading = false;

    games = [] as GamesResponse[];
    gamesPage = [] as GamesResponse[];

    gameProfile = {} as GameProfileResponse;
    userGrade = {} as userGrade;
    pageCount = 0;
    currentPage = 0;

    sort = 'null';
    genre = 'null';

    reviews = [] as ReviewCardModel[];
    userLists = [] as CheckGameInUserListsResponseModel[];
    gameInLists = {} as CheckGameInDefaultListsResponseModel;

    constructor() {
        makeAutoObservable(this);
    }

    setReviews(review: ReviewCardModel[]) {
        this.reviews = review;
    }
    setGameInLists(lists: CheckGameInDefaultListsResponseModel) {
        this.gameInLists = lists
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

    setUserLists(lists: CheckGameInUserListsResponseModel[]) {
        this.userLists = lists;
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



    async getReviewsFunc(offset: number | null, limit: number | null, 
        popular: boolean | null, slug: string | null, user_id: string, game_id: string) {
        this.setLoading(true);
        try {
            if (getLocalToken()) {
                // const user = await AuthService.getMyProfile();
                const response = await ReviewService.getReviews(offset, limit, popular, user_id, slug);
                this.setReviews(response.data)
            } 
            else {
                const response = await ReviewService.getReviews(offset, limit, popular, null, slug);
                this.setReviews(response.data)
            }
        } catch (error) {
            this.setReviews([] as ReviewCardModel[])
        } try {
            const userGrade = await GameService.getUserGrade(game_id)
            this.setUserGrade(userGrade.data)
        } catch (error) {
            this.setUserGrade({} as userGrade)
        } try {
            if (popular != true) {
                const response = await ReviewService.getReviewsCount();
                this.setPageCount(response.data.count)
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
            try {
                if (getLocalToken() !== null) {
                    const checkInDefaultLists = await ListService.GameInDefaultListsCheck(this.gameProfile.id)
                    this.setGameInLists(checkInDefaultLists.data)
                }
            } catch (error) {

            } try {
                const checkInUserLists = await ListService.GameInUserListsCheck(this.gameProfile.id)
                this.setUserLists(checkInUserLists.data)
            } catch (error) {

            }
            // try {

            //     const userGrade = await GameService.getUserGrade(this.gameProfile.id)
            //     this.setUserGrade(userGrade.data)

            //     if (userGrade.data === null) {
            //         this.setUserGrade({
            //             id: 'string',
            //             user_id: 'string',
            //             game_id: 'string',
            //             grade: 0,
            //             comment: 'string',
            //             created_at: null
            //         })
            //     }

            // } catch (error) {

            // }
        } catch (error) {
        } finally {
            this.setLoading(false);
        }
    }
    async addGameToUserList(list_id: string) {
        try {
            await ListService.addGameToList(list_id, this.gameProfile.id)

            const checkInUserLists = await ListService.GameInUserListsCheck(this.gameProfile.id)
            this.setUserLists(checkInUserLists.data)
        } catch (error) {

        }
    }
    // async updateGameInUserList(){
    //     try {
    //         const checkInUserLists = await ListService.GameInUserListsCheck(this.gameProfile.id)
    //         this.setUserLists(checkInUserLists.data)
    //     } catch (error) {

    //     }
    // }

    async getGameByPage(page: number, limit: number | null, sort: string | null, decade: string | null, genre: string | null) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamesPages(Number(page), limit, sort, decade, genre);
            this.setGamesPage(response.data)

        } catch (error) {
            this.setGamesPage([] as GamesResponse[])
            //const err = error as AxiosError
        } try {
            const response = await GameService.getGamesCount(limit, genre);
            this.setPageCount(response.data.count)
        } catch (error) {

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
            if (comment === '') {
                comment = null
            }

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
            this.setReviews([] as ReviewCardModel[])
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