import { useContext } from 'react';
import '../../styles/create-list-page.css'
import { Context } from '../..';
import ListCreateForm from '../../components/listcreateform/list-create-form';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';


const CreateListPage = () => {
    const { auth_store } = useContext(Context);
    const { username } = useParams<string>();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Создание списка</title>
                <link rel="canonical" href={'https://dudesplay.ru/' + username + '/lists/create'} />
                <meta name="title" content='Создание списка' />
                <meta name="description" content={'Страница создания списка'} />
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:title" content='Создание списка' />
                <meta property="og:description" content={'Страница создания списка'} />

            </Helmet>
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
        </>
    )
}

export default observer(CreateListPage);