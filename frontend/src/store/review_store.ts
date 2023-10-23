import { makeAutoObservable } from "mobx";
import { ReviewCardModel } from "../models/reviewModels";
import ReviewService from "../service/ReviewService";

export default class ReviewStore {

    reviews = [] as ReviewCardModel[];
    isLoading = false;
    pageCount = 0;

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

    async getReviewsFunc(offset: number | null, limit: number | null, popular: boolean | null) {
        this.setLoading(true);
        try {
            const response = await ReviewService.getReviews(offset, limit, popular);
            this.setReviews(response.data)
        } catch (error) {

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
}