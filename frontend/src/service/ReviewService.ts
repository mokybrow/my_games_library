import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { ReviewCardModel } from "../models/reviewModels";
import { PageCountResponseModel} from "../models/generalModels";

export default class ReviewService {

    static async getReviews(offset: number | null, limit: number| null, popular: boolean| null): Promise<AxiosResponse<ReviewCardModel[]>> {

        return axios.get<ReviewCardModel[]>(`${API_URL}review/all`,
            {
                params: {
                    offset: offset,
                    limit: limit,
                    popular: popular
                }
            },)
    }

    static async getReviewsCount(): Promise<AxiosResponse<PageCountResponseModel>> {

        return axios.get<PageCountResponseModel>(`${API_URL}review/all/count`,)
    }

}