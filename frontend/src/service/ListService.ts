import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, ListCreateResponse, RegEmailCheck, RegResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

export default class ListService {

    static async createList(name: string, description: string, is_private: boolean): Promise<AxiosResponse<ListCreateResponse>> {

        return $api.post<ListCreateResponse>(`/list/create/`,
        {
            name: name,
            description: description,
            is_private: is_private,
        },)
    }

    static async addListCover(list_id:string ,img: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.set('img', img);
        return $api.post('/list/add_cover/', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                list_id,
            }
        })
    }

    static async checkUniqListname(name: string): Promise<AxiosResponse<ListCreateResponse>> {
        return $api.post<ListCreateResponse>(`/list/check/`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            name: name,
        },)
    }
}