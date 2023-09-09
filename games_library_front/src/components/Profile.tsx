import React from 'react'
import { api } from '../api/api';
import axios from 'axios';
import { getLocalToken } from '../utils/utils';


export const Profile = () => {
    const submitHandler = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Nzc0ZmJlMS03YWEwLTRhOGEtYWU3OC1iMjI4MzNmMjNjYTkiLCJhdWQiOlsiZmFzdGFwaS11c2VyczphdXRoIl0sImV4cCI6MTY5NDI3NTYzMn0.ZT0EwoNus66XxBgWCwXNpgeb2JHGj9XSNl7xs4dOCZg'
        const gettoken = getLocalToken()
        const response = await api.getMe();
        console.log(gettoken)

    };
    submitHandler();

    return (
        <div className="container">

        </div>
    );
};