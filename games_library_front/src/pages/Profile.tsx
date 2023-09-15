import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();
    const { username } = useParams<{ username?: string }>();
    const [userNotFound, setError] = useState({
        "user": "",
    });
    const [user, setUser] = useState({
        "id": "",
        "email": "",
        "is_active": "",
        "is_superuser": "",
        "is_verified": "",
        "username": "",
        "name": "",
        "surname": "",
        "gender": "",
        "birthdate": "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.getPublicUser(username);
            const userPage = await api.getUser();
            if (userPage != 401) {
                if (userPage["username"] == username) {
                }
            }
            if (result==404){
                setError({'user':'not found'})
            }
            setUser(result);
        };
        fetchData();
    }, []);

    const callLogout = async () => {
        api.logOut();
        navigate("/");
    };

    return (
        <div className="container">
            <h1>{user.username}</h1>
            <h1>{user.name}</h1>
            <h1>{userNotFound.user}</h1>
            <button onClick={callLogout}>Выход</button>
        </div>
    );
};



