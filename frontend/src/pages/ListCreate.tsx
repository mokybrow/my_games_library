import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import ListCreateForm from '../components/ListCreateForm';
import { useNavigate } from 'react-router-dom';


const ListCreate: FC = () => {

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

    if (!auth_store.isAuth) {
        navigate("/");

    }
    return (
        <>
            <section className='list-create-section'>
       
                    <div className="data-form-container">
                        
                        <h1>Создайте свой список</h1>
                        <ListCreateForm />
                        {/* <form action="#" onSubmit={imgHandler} className='list-create-form'>
                            
                        </form> */}
                    </div>

            </section>
        </>
    )
}

export default observer(ListCreate);