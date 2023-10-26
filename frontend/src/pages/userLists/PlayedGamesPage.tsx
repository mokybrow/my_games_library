import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../..';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Pagination } from '../../components/Pagination';

const PlayedGamesPage: FC = () => {

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();

    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState<number>(Number(myParam));
    useEffect(() => {
        const checkUsername = async () => {
            const response = await auth_store.checkAuth()

            return response
        }
        checkUsername().then(function (value: any) {
            if (value !== String(username)) {
                user_store.findUser(String(username), 0, null)
                console.log('Это не я')
            }
            else {
                auth_store.getMyProfileFunc(0, null)
            }
        })

    }, [])

    const handlePageClick = async (event: { selected: number; }) => {
        setCurrentPage(currentPage)
        setSearchParams({ page: String(event.selected + 1) });
        setCurrentPage(event.selected + 1)
    };
    if ((auth_store.isAuth && auth_store.user.username !== username) || (!auth_store.isAuth)) {
        return (
            <>
            <section className='page-section'>
                <div className="grid-container">
                        {user_store.userActivity.length > 0 ?
                            <>
                                {user_store.userActivity.map((game) => <>{game.activity_type == 'passed' ?
                                    <Link key={game.id} to={'/game/' + game.slug}>
                                        <div className="profile-card-cover-container">
                                            <img src={game.cover} />
                                            <div className="title-card-body-profile">
                                                <div className="title-card">
                                                    <span className="card-title">{game.title}</span>

                                                </div>
                                                <div className="title-card-activity">

                                                    <span className="card-title-activity">

                                                        <FormattedMessage id="content.userprofile.passed" />
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link> : null}</>)}
                            </> : null
                        }
                        <Pagination initialPage={currentPage - 1}
                            pageCount={Math.ceil(user_store.pageCount)}
                            onChange={handlePageClick} />
                    </div>

                </section>
            </>
        )
    }
    return (
        <>
            <section className='page-section'>
                <div className="grid-container">
                    {auth_store.userActivity.length > 0 ?
                        <>
                            {auth_store.userActivity.map((game) => <>{game.activity_type == 'passed' ?
                                <Link key={game.id} to={'/game/' + game.slug}>
                                    <div className="profile-card-cover-container">
                                        <img src={game.cover} />
                                        <div className="title-card-body-profile">
                                            <div className="title-card">
                                                <span className="card-title">{game.title}</span>

                                            </div>
                                            <div className="title-card-activity">

                                                <span className="card-title-activity">

                                                    <FormattedMessage id="content.userprofile.passed" />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </Link> : null}</>)}
                        </> : null
                    }
                    <Pagination initialPage={currentPage - 1}
                        pageCount={Math.ceil(user_store.pageCount)}
                        onChange={handlePageClick} />
                </div>
            </section>
        </>
    )
}

export default observer(PlayedGamesPage);