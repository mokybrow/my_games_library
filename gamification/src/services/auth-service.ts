import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../api/api";
import { AuthResponse, RegResponse, RegValidationModel } from "../models/authModels";
import { IUserModel, UserResponseModel } from "../models/userModels";

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
    static async veirifyEmail(email: string): Promise<AxiosResponse> {
        return $api.post('/auth/request-verify-token', 
        {
            email: email,
        })
    }

    static async registration(email: string, password: string, username: string, name: string): Promise<AxiosResponse<RegResponse>> {
        return $api.post<RegResponse>('/auth/register', { email: email, password: password, username: username, name: name})
    }

    static async getMyProfile(): Promise<AxiosResponse<IUserModel>> {
        return $api.get<IUserModel>(`/user/my/profile`)
    }

    static async getUserProfile(username: string): Promise<AxiosResponse<UserResponseModel>> {
        return axios.get<UserResponseModel>(`${API_URL}user/${username}`,)
    }

    static async getUserByUsername(username: string): Promise<AxiosResponse<RegValidationModel>> {
        return axios.post<RegValidationModel>(`${API_URL}user/get/by/username/${username}`,)
    }

    static async getUserByEmail(email: string): Promise<AxiosResponse<RegValidationModel>> {
        return axios.post<RegValidationModel>(`${API_URL}user/get/by/email/${email}`,)
    }

    static async changeUserData(password: string, name: string, surname: string, sex: string): Promise<AxiosResponse> {
        if (password === ' '){
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