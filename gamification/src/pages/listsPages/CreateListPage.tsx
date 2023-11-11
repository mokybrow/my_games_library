import { useContext } from 'react';
import '../../styles/create-list-page.css'
import { Context } from '../..';
import ListCreateForm from '../../components/listcreateform/list-create-form';
import { observer } from 'mobx-react-lite';


const CreateListPage = () => {
    const { auth_store } = useContext(Context);

    return (
        <section className='create-list-page'>
            <div className="create-list-grid-container">
                <div className="list-create-banner list-count">
                    <h1>Вы создали списков: </h1>
                    <h1>{auth_store.user.list_count}</h1>
                </div>
                <div className="list-create-banner">
                    <ListCreateForm />
                </div>
            </div>
        </section>
    )
}

export default observer(CreateListPage);