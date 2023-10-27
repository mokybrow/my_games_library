import axios, { AxiosResponse } from "axios";
import { AUser, UserActivityResponse, UserImg, UserLastReviews, UserListsResponse, detail } from "../models/response";
import $api, { API_URL } from "../api/api";


export default class UserService {

    static async getUserProfile(username: string): Promise<AxiosResponse<AUser>> {
        return axios.get<AUser>(`${API_URL}user/${username}`)
    }

    static async followUnfollowOnUser(user_id: string) {
        return $api.post(`user/follow/unfollow`, null, {
            params: {
                user_id: user_id,
            }
        }
        )
    }


    static async checkFollow(user_id: string): Promise<AxiosResponse<detail>> {
        return $api.get<detail>(`user/follow/check`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                user_id: user_id,
            }

        }
        )
    }

    static async getUserReviews(user_id: string, offset: number | null, limit: number | null): Promise<AxiosResponse<UserLastReviews[]>> {

        return $api.get<UserLastReviews[]>(`/user/last/reviews`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    user_id: user_id,
                    offset: offset,
                    limit: limit,
                }

            }
        )
    }

    static async getUserImg(id: string): Promise<AxiosResponse<UserImg>> {

        return $api.get<UserImg>(`/user/get/img`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    id,
                }
            })
    }

    static async getUserLists(user_id: string): Promise<AxiosResponse<UserListsResponse[]>> {

        return $api.get<UserListsResponse[]>(`/user/lists/all`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    user_id: user_id,
                }
            })
    }
    static async getUserNotPrivateLists(user_id: string): Promise<AxiosResponse<UserListsResponse[]>> {

        return $api.get<UserListsResponse[]>(`/user/lists/private/all`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    user_id: user_id,
                }

            })
    }
    static async getuserActivityGames(user_id: string, offset: number | null, limit: number | null): Promise<AxiosResponse<UserActivityResponse[]>> {
        return $api.get<UserActivityResponse[]>(`/user/get/activity`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    user_id: user_id,
                    offset: offset,
                    limit: limit,
                }
            })
    }

    static async getUserAddedLists(id: string): Promise<AxiosResponse<UserListsResponse[]>> {

        return $api.get<UserListsResponse[]>(`/user/added/lists`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    user_id: id,
                }
            })
    }


}