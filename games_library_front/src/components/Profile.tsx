import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

import { Link, Outlet, useParams } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();
    const { usename } = useParams<{ usename?: string }>();

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
            const result = await api.getUser();
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
            <h1>{user.surname}</h1>
            <button onClick={callLogout}>Выход</button>
        </div>
    );
};



