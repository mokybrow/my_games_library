import { useContext, useEffect } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { store } = useContext(Context);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Loading...</div>
    }
    if (store.isAuth) {
        navigate("/");
    } else {
        return (<LoginForm/>)
    }
    return <div></div>
}

export default observer(LoginPage);