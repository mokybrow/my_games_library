import axios from 'axios';

export const api = {
    async logInGetToken(username: string, password: string) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        return axios.post("http://localhost:8000/auth/login", params);
    }
};