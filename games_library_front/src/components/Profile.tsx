import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';


export const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "id": "",
        "email": "",
        "is_active": true,
        "is_superuser": false,
        "username": "",
        "name": "",
        "surname": ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.getMe();
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
            <button onClick={callLogout}>Выход</button>
        </div>
    );
};



