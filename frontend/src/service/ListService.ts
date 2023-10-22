import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GamesCountResponse, IUser, ListsGameResponse, RegEmailCheck, RegResponse, UserListsResponse, checkAddedListsGameResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

export default class ListService {

    static async createList(title: string, description: string, is_private: boolean, img: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.set('img', img);

        return $api.post(`list/create`, formData,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    title: title,
                    description: description,
                    is_private: is_private,
                }
            },)
    }

    static async approveCreateList(title: string,) {
        return $api.get(`/list/approve/create`,
            {
                params: {
                    title: title,
                }
            },)
    }


    static async getUserLists(name: string, description: string, is_private: boolean): Promise<AxiosResponse> {
        return $api.get(`/lists/user/all/`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    name: name,
                    description: description,
                    is_private: is_private,
                }
            },)
    }


    static async getListGames(slug: string): Promise<AxiosResponse<ListsGameResponse[]>> {
        return $api.get<ListsGameResponse[]>(`/list/games`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    slug: slug
                }

            },)
    }

    static async getListData(slug: string): Promise<AxiosResponse<UserListsResponse>> {
        return $api.get<UserListsResponse>(`/list/data`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    slug: slug
                }

            },)
    }

    static async checkAdded(slug: string, user_id: string): Promise<AxiosResponse<checkAddedListsGameResponse>> {
        return $api.get<checkAddedListsGameResponse>(`/list/${slug}/check/added/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            },)
    }

    static async AddDeleteListToMy(slug: string, user_id: string): Promise<AxiosResponse> {
        return $api.post(`/add/delete/lists/${slug}/user/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            },)
    }

    static async addGameToList(list_id: string, game_id: string): Promise<AxiosResponse> {
        return $api.post(`/lists/add_game_to_user_list`, null, {
            params: {
                list_id,
                game_id
            }
        })
    }

    static async getAllLists(): Promise<AxiosResponse<UserListsResponse[]>> {
        return $api.get<UserListsResponse[]>(`/lists/all`)
    }

    static async geListsCount(): Promise<AxiosResponse<GamesCountResponse>> {
        return $api.get<GamesCountResponse>(` /lists/all/page/count`)
       
    }
}