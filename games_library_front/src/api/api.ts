import axios from 'axios';
import { saveLocalToken } from '../utils/utils';


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

    async registerRequest(email: string, password: string, username: string, name:string){
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
    async getMe(TOKEN : string) {
        return axios.get(
            'http://localhost:8000/users/me', {
            headers: {
                'Authorization': `Cookie ${TOKEN }`,
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      },

};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("mishkastudio");
    console.log(userStr)
    if (userStr) return JSON.parse(userStr);
  
    return null;
  };