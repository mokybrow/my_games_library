import { makeAutoObservable } from "mobx";
import { ReviewCardModel } from "../models/reviewModels";
import { userGrade } from "../models/userModels";
import AuthService from "../services/auth-service";
import { getLocalToken } from "../utils/utils";
import ReviewService from "../services/review-service";
import GameService from "../services/game-service";


export default class ReviewStore {

    reviews = [] as ReviewCardModel[];
    isLoading = false;
    pageCount = 0;
    userGrade = {} as userGrade;

    setUserGrade(number: userGrade) {
        this.userGrade = number;
    }

    setPageCount(count: number) {
        this.pageCount = count
    }

    setReviews(review: ReviewCardModel[]) {
        this.reviews = review;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    constructor() {
        makeAutoObservable(this);
    }

    async getReviewsFunc(offset: number | null, limit: number | null, popular: boolean | null, slug: string | null) {
        this.setLoading(true);
        try {
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
            this.setReviews([] as ReviewCardModel[])

        } try {
            // const response = await GameService.getGameBySlug(String(slug));
            // const userGrade = await GameService.getUserGrade(response.data.id)
            // this.setUserGrade(userGrade.data)
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