import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, RegEmailCheck, RegResponse } from "../models/response";
import $api, { API_URL } from "../api/api";
import { getLocalToken } from "../utils/utils";

export default class AuthService {

    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        return $api.post<AuthResponse>('/auth/login', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }

    static async registration(email: string, password: string, username: string, name: string): Promise<AxiosResponse<RegResponse>> {
        return $api.post<RegResponse>('/auth/register', { email: email, password: password, username: username, name: name })
    }

    static async getUserInfo(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`${API_URL}username`)
    }

    static async getUserProfile(username: string): Promise<AxiosResponse<AUser>> {
        return axios.get<AUser>(`${API_URL}user/${username}`,)
    }

    static async getUserbyUsername(username: string): Promise<AxiosResponse<AUser>> {
        return axios.post<AUser>(`${API_URL}user/get_by_username/${username}`,)
    }

    static async getUserbyEmail(email: string): Promise<AxiosResponse<RegEmailCheck>> {
        return axios.post<RegEmailCheck>(`${API_URL}user/get_by_email/${email}`,)
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
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