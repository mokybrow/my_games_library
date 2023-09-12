import axios from 'axios';
import { getLocalToken, saveLocalToken } from '../utils/utils';


export const api = {
    async loginRequest(username: string, password: string) {
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
                withCredentials: true,

            },

        )
            .then((response) => saveLocalToken(response.data.access_token))
            .catch((error) => console.log(error));
    },

    async registerRequest(email: string, password: string, username: string, name: string) {
        return axios.post('http://localhost:8000/auth/register', {
            email: email,
            password: password,
            username: username,
            name: name,
            surname: null,
            birthdate: null,
            gender: null
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

    },
    async getUser() {
        const TOKEN = getLocalToken()
        return axios.get(
            'http://localhost:8000/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            withCredentials: true,
        })
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    async logOut() {
        const TOKEN = getLocalToken()
        return axios.post('http://localhost:8000/auth/logout',
            null,
            {
                headers: {
                    'Cookie': `fastapiusersauth=${TOKEN}`,
                },
                withCredentials: true,

            }

        )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    },
    async getLists() {
        const TOKEN = getLocalToken()
        return axios.get(
            'http://localhost:8000/lists/all', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            withCredentials: true,
        })
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    async isAuthenticated() {
        const permissions = localStorage.getItem('permissions');
        if (!permissions) {
            return false;
        }
        console.log(permissions)
        return permissions === 'user' ? true : false;
    },
};
