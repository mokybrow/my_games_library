import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { CheckFollowResponse, UserActivityResponse, UserLastReviews, UserListsResponse, UserResponseModel } from "../models/userModels";


export default class UserService {

    static async getUserProfile(username: string): Promise<AxiosResponse<UserResponseModel>> {
        return axios.get<UserResponseModel>(`${API_URL}user/${username}`)
    }

    static async followUnfollowOnUser(user_id: string) {
        return $api.post(`user/follow/unfollow`, null, {
            params: {
                user_id: user_id,
            }
        }
        )
    }


    static async checkFollow(user_id: string): Promise<AxiosResponse<CheckFollowResponse>> {
        return $api.get<CheckFollowResponse>(`user/follow/check`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                user_id: user_id,
            }
        })
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
    static async changeUserData(password?: string, name?: string, surname?: string, sex?: string): Promise<AxiosResponse> {

        return $api.patch(`${API_URL}users/me`,
            {
                password: password,
                name: name,
                surname: surname,
                gender: sex,
            },)
    }
    static async uploadImg(img: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.set('img', img);
        return $api.post('/user/change/img', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }
}