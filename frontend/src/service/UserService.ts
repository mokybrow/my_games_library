import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, RegEmailCheck, RegResponse, UserLastReviews, UserStat, detail } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

export default class UserService {

    static async getUserProfile(username: string): Promise<AxiosResponse<AUser>> {
        return axios.get<AUser>(`${API_URL}user/${username}`)
    }

    static async followOnUser(user_id: string){
        return $api.post(`${API_URL}follow_to/${user_id}`, {
        })
    }
    static async unFollowOnUser(user_id: string) {
        return $api.delete(`${API_URL}unfollow_to/${user_id}`, {

        })
    }

    static async checkFollow(user_id: string): Promise<AxiosResponse<detail>> {
        return $api.get<detail>(`${API_URL}follow_check/${user_id}`, {
        })
    }

    static async getUserReviews(user_id: string): Promise<AxiosResponse<UserLastReviews[]>> {

        return $api.get<UserLastReviews[]>(`/last/reviews/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }
}