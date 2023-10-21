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
        return (
            <section className='loader-section'>
                <div className="lds-spinner"><div></div>
                    <div></div><div></div>
                    <div></div><div></div><div>
                    </div><div></div><div></div><div
                    ></div><div></div><div></div>
                    <div></div></div>
            </section>

        )
    }
    if (auth_store.isAuth) {
        navigate("/");
    }

    return (
        <section className='auth-section'>
            <div className="form-container">
                <LoginForm />
            </div>
        </section>
    )


}

export default observer(LoginPage);