import axios, { AxiosResponse } from "axios";
import { AUser, AuthResponse, IUser, RegResponse } from "../models/response";
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

    static async getMe(): Promise<AxiosResponse<IUser>> {
        return axios.get<IUser>(`${API_URL}users/me`, {
            headers: {
                'Authorization': `Bearer ${getLocalToken()}`,
            },
        })
    }
    static async getUser(username:string): Promise<AxiosResponse<AUser>> {
        return axios.get<AUser>(`${API_URL}user/${username}`,)
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }
}