import axios, { AxiosResponse } from "axios";
import { getLocalToken } from "./utils";
import { User } from "../models/user";


export const api = {
    async SignupGetToken(email: string, password: string, username: string, name: string) {
        return axios.post('http://localhost:8000/auth/register', {
            email: email,
            username: username,
            name: name,
            password: password,
        })
    },
    async logInGetToken(username: string, password: string) {
        const formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        return axios.post(
            'http://localhost:8000/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            },
        )
    },
    async getUser() {
        const TOKEN = getLocalToken()
        return axios.get(
            'http://localhost:8000/users/me', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
            withCredentials: true
        })
    },
    async Logout() {
        const TOKEN = getLocalToken()
        return axios.post('http://localhost:8000/auth/logout',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                },
            }
        )
    },
    async User(username: string) {
        return axios.get(`http://localhost:8000/user/${username}`,

        )
    },
}

