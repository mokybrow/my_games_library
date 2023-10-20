import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, ListCreateResponse, ListsGameResponse, RegEmailCheck, RegResponse, UserListsResponse, checkAddedListsGameResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

export default class ListService {

    static async createList(title: string, description: string, is_private: boolean, img: any): Promise<AxiosResponse<ListCreateResponse>> {
        const formData = new FormData();
        formData.set('img', img);
        return $api.post<ListCreateResponse>(`/list/create/`, formData,
            {
                params: {
                    title: title,
                    description: description,
                    is_private: is_private,
                }
            },)
    }

    static async approveCreateList(title: string,) {
        return $api.get<ListCreateResponse>(`/list/approve/create`,
            {
                params: {
                    title: title,
                }
            },)
    }

    static async addListCover(list_id: string, img: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.set('img', img);
        return $api.post('/list/add_cover/', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    list_id: list_id,
                }
            })
    }


    static async getUserLists(name: string, description: string, is_private: boolean): Promise<AxiosResponse<ListCreateResponse>> {
        return $api.post<ListCreateResponse>(`/lists/user/all/`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                name: name,
                description: description,
                is_private: is_private,
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

    static async getListData(list_id: string): Promise<AxiosResponse<UserListsResponse>> {
        return $api.get<UserListsResponse>(`/list/data`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                list_id: list_id
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
}