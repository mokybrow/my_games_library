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

    static async getMyProfile(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/user/my/profile`)
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

    static async changeUserData(password: string, name: string, surname: string, sex: string): Promise<AxiosResponse> {
        console.log(password)
        if (password == ' '){
            return $api.patch(`${API_URL}users/me`,
            {
                name: name,
                surname: surname,
                gender: sex,
            },)
        }
        return $api.patch(`${API_URL}users/me`,
        {
            password: password,
            name: name,
            surname: surname,
            gender: sex,
        },)
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