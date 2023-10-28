import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, GamesCountResponse, IUser, ListsGameResponse, RegEmailCheck, RegResponse, UserListsResponse, checkAddedListsGameResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";
import { PageCountResponseModel } from "../models/generalModels";
import { CheckGameInDefaultListsResponseModel, CheckGameInUserListsResponseModel } from "../models/listsModels";

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
        return $api.get<checkAddedListsGameResponse>(`/list/check/added`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    slug: slug,
                    user_id: user_id
                }
            },)
    }

    static async AddDeleteListToMy(slug: string, user_id: string): Promise<AxiosResponse> {
        return $api.post(`/list/add/delete`, null,
            {
                params: {
                    slug: slug,
                    user_id: user_id,
                }

            },)
    }

    static async addGameToList(list_id: string, game_id: string): Promise<AxiosResponse> {
        return $api.post(`/list/add/game/to/user/list`, null, {
            params: {
                list_id,
                game_id
            }
        })
    }

    static async getAllLists(): Promise<AxiosResponse<UserListsResponse[]>> {
        return $api.get<UserListsResponse[]>(`/list/all`)
    }

    static async geListsCount(): Promise<AxiosResponse<PageCountResponseModel>> {
        return axios.get<PageCountResponseModel>(` ${API_URL}list/all/count`)
    }


    static async GameInDefaultListsCheck(game_id: string): Promise<AxiosResponse<CheckGameInDefaultListsResponseModel>> {
        return $api.get<CheckGameInDefaultListsResponseModel>(`/list/check/game/default/lists`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }

    static async GameInUserListsCheck(game_id: string): Promise<AxiosResponse<CheckGameInUserListsResponseModel[]>> {
        return $api.get<CheckGameInUserListsResponseModel[]>(`/list/check/game/user/lists`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                params: {
                    game_id: game_id,
                }
            })
    }
}