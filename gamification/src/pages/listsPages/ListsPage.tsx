import { observer } from 'mobx-react-lite';
import '../../styles/lists-page.css'
import { useContext, useEffect } from 'react';
import { Context } from '../..';
import ListPageCard from '../../components/listscard/list-card';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet';


const ListsPage = () => {
    const { user_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { username } = useParams<{ username?: string }>();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (auth_store.user.username !== undefined) {
            if (auth_store.user.username.toLowerCase() !== String(username).toLowerCase()) {
                user_store.findUser(String(username), 0, 6)
            }
            else {
                user_store.getUserListsFunc(auth_store.user.id)
            }
        }

    }, [auth_store.user.username])

    if (user_store.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Списки {username}</title>
                <link rel="canonical" href={'https://dudesplay.ru/' + username + '/lists'} />
                <meta name="title" content={'Списки' + username}/>
                <meta name="description" content={'Списки' + username} />
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:title" content={'Списки' + username} />
                <meta property="og:description" content={'Списки' + username}/>

            </Helmet>
            <section className='lists-page-section'>
                <div className='lists-grid-container'>
                    {user_store.list.length > 0 ?
                        <>
                            {user_store.list.map((list) =>
                                <div key={list.id}>
                                    <ListPageCard
                                        listId={list.id}
                                        listSlug={list.slug}
                                        listCover={list.cover}
                                        listTitle={list.title} />
                                </div>
                            )}
                        </>
                        : null}
                </div>
            </section>
        </>
    )
}

export default observer(ListsPage);