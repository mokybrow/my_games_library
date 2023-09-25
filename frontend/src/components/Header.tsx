import React, { FC, useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Context } from '..';
import { observer } from 'mobx-react-lite';




const Header: FC = () => {
    const { store } = useContext(Context);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (!store.isAuth) {
        navigate("/login");
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to={'/' + store.user.username}>Profile</Link>
                    </li>
                    <li>
                        <button onClick={() => store.logout()}>Выход</button>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </>
    )
}


export default observer(Header);