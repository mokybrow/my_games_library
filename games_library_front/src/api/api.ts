import axios from 'axios';


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
            },
        )
            .then((response) => console.log(response))
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

    }

};

