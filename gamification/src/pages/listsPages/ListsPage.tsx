import { observer } from 'mobx-react-lite';
import '../../styles/lists-page.css'
import { useContext, useEffect } from 'react';
import { Context } from '../..';
import { ListPageCard } from '../../components/listscard/list-card';
import { useParams } from 'react-router-dom';


const ListsPage = () => {
    const { user_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { username } = useParams<{ username?: string }>();

    useEffect(() => {

        const checkUsername = async () => {
            const response = await auth_store.checkAuth()
            return response
        }
        checkUsername().then(function (value: any) {
            if (value.toLowerCase() !== String(username).toLowerCase()) {
                user_store.findUser(String(username), 0, 6)
            } else {
                user_store.getUserListsFunc(auth_store.user.id)
            }
        })

    }, [])
    return (
        <section className='lists-page-section'>
            <div className='lists-grid-container'>
                {user_store.list.length > 0 ?
                    <>
                        {user_store.list.map((list) =>
                            <ListPageCard
                                listId={list.id}
                                listSlug={list.slug}
                                listCover={list.cover}
                                listTitle={list.title} />
                        )}</>
                    : null}
            </div>
        </section>
    )
}

export default observer(ListsPage);