import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';


export const Profile = () => {
    const navigate = useNavigate();

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
        //   if (await api.isAuthenticated()){
            const result = await api.getUser();
            setUser(result);
         // };
        };
        fetchData();
      // eslint-disable-next-line
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



