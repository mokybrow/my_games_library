import React, { FC, useContext, useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import { Context } from '..';
import { observer } from 'mobx-react-lite';




const Header: FC = () => {
    const { auth_store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }
    }, [])

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {auth_store.isAuth ? <><li>
                        <Link to={'/' + auth_store.user.username} reloadDocument>{auth_store.user.username}</Link>
                    </li> </>: null}

                    {auth_store.isAuth ? <><li>
                        <button onClick={() => auth_store.logout()}>Выход</button>
                    </li> </> : <><Link to={'/login'}>Войти</Link>/<Link to={'/signup'}>Зарегистрироваться</Link></>}

                </ul>
            </nav>
            <hr />
            <Outlet />
        </>
    )
}


export default observer(Header);