import React from 'react'
import { api, getCurrentUser } from '../api/api';
import { getLocalToken } from '../utils/utils';

export const Profile = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        console.log('token есть')
    }
    const submitHandler = async () => {

        const tokentoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYzAzMDQxOC1mODQyLTRmYWYtYjg3My1lNmI1MjhkMmFlODgiLCJhdWQiOlsiZmFzdGFwaS11c2VyczphdXRoIl0sImV4cCI6MTY5NDI2OTAyNX0.UE62xx3-Cqa1aveOre_rSA9Na4H-UvA_Vrxa9vgd9m8'
        const response = await api.getMe(tokentoken);
        console.log(response)

    }
    submitHandler();
    // const response =  api.getMe(token)
    // console.log(response)

    return (
        <div className="container">

        </div>
    );
};