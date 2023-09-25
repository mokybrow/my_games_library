import { useContext, useEffect } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { auth_store } = useContext(Context);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }
    }, [])

    if (auth_store.isLoading) {
        return <div>Loading...</div>
    }
    if (auth_store.isAuth) {
        navigate("/");
    } else {
        return (<LoginForm />)
    }
    return <div></div>
}

export default observer(LoginPage);