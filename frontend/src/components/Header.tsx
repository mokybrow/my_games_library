import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import './styles/header.css'
import './styles/search.css'
import { useTheme } from '../hooks/useTheme';
import { FormattedMessage } from 'react-intl';
import { ModalWindow } from './ModalWindow';
import { GamesResponse } from '../models/response';


const Header: FC = () => {
    const { auth_store } = useContext(Context);
    const { theme, setTheme } = useTheme()
    const [active, setModalActive] = useState(false);
    const { search_store } = useContext(Context);
    const [searchInput, setSearchInput] = useState('');
    const body = document.body;
    //чекбоксик
    const [checked, setChecked] = useState(false);

    function handleChange() {
        setChecked(!checked); // инвертируем стейт
        if (checked) {
            setTheme('light')
        }
        if (!checked) {
            setTheme('dark')
        }
    }
    if (active) {
        body.classList.toggle('lock')
    }
    if (!active) {
        body.classList.remove('lock')

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }
        if (theme == 'dark') {
            setChecked(true)
        }
    }, [auth_store])

    const searchHandler = (title: any) => {
        setSearchInput(title)
        search_store.searchGameFunc(searchInput)
    }

    const buttonFunc = () => {

        const menu = document.querySelector('.menu-body')
        const menuBtn = document.querySelector('.menu-icon')
        const body = document.body;
        const mediaQuery = window.matchMedia('(min-width: 1023px)')
        if (menu && menuBtn) {
            menu.classList.toggle('active')
            menuBtn.classList.toggle('active')
            body.classList.toggle('lock')

            menu.querySelectorAll('.menu-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active')
                    menuBtn.classList.remove('active')
                    body.classList.remove('lock')
                })
            })

            menu.querySelectorAll('.menu-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.toggle('active')
                    menuBtn.classList.toggle('active')
                    body.classList.toggle('lock')
                })
            })

            const handleTabletChange = (e: any) => {
                if (e.matches) {
                    menu.classList.remove('active')
                    menuBtn.classList.remove('active')
                    body.classList.remove('lock')
                }
            }

            mediaQuery.addListener(handleTabletChange)
            handleTabletChange(mediaQuery)
        }

    }

    return (
        <>
            <header className="header">
                <div className="top-left">
                    <Link className="header-logo" to='/'>
                        <FormattedMessage
                            id="header.menu.logo"

                        />
                    </Link>
                </div>
                <div onClick={buttonFunc} className="header-menu menu">
                    <div className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="menu-body">
                        <ul className="menu-list">
                            <li className="menu-item" id="menu-item-transition">
                                <Link className="menu-link" to='/games?page=1' reloadDocument>
                                    <FormattedMessage id="header.menu.item1" />
                                </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/playlists?page=1' reloadDocument>
                                <FormattedMessage id="header.menu.item2" />
                            </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/articles?page=1' reloadDocument>
                                <FormattedMessage id="header.menu.item3" />
                            </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/reviews?page=1' reloadDocument>
                                <FormattedMessage id="header.menu.item4" />
                            </Link></li>
                            <li className="menu-item" id="search-item-transition" onClick={() => { { setModalActive(true) } { search_store.setGames([] as GamesResponse[]) } { setSearchInput('') } }} >Поиск
                                <img className='dropdown-img' src={require('../icons/search.png')} />
                            </li>

                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <Link className="menu-link" to={'/' + auth_store.user.username} reloadDocument>{auth_store.user.username}</Link>
                            </li > </> : null}
                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <Link onClick={() => auth_store.logout()} to={'/'} className="menu-link" id="menu-item-transition">
                                    <FormattedMessage id="header.menu.logout" />
                                </Link>
                            </li></>
                                :
                                <>
                                    <li className="user-icon-desktop menu-item menu-link">
                                        <Link className="menu-link" to={'/login'}>
                                            <FormattedMessage id="header.menu.login" />
                                        </Link>
                                    </li>
                                    <li className="user-icon-desktop menu-item menu-link">
                                        <Link className="menu-link" to={'/signup'}>
                                            <FormattedMessage id="header.menu.signin" />
                                        </Link>
                                    </li>
                                </>}
                            <li className="user-icon-desktop menu-item menu-link">
                                <div className="theme-controller-mobile">
                                    <div className="toggle-pill-dark">
                                        <input type="checkbox" id="pill4" name="check" checked={checked} onChange={handleChange} />
                                        <label htmlFor="pill4"></label>
                                    </div>
                                </div><p><FormattedMessage id="header.menu.theme" /></p>
                            </li>
                        </ul>
                    </nav>
                </div>
                <ModalWindow active={active} setActive={setModalActive}>
                    <div className='search-input-container'>
                        <input type="text" className='game-search-input' placeholder='Поиск' onChange={(e) => searchHandler(e.target.value)} value={searchInput} />
                        <button className='form-button' onClick={() => { { setSearchInput('') } { search_store.setGames([] as GamesResponse[]) } }}>Очистить</button>
                    </div>
                    <div className='search-grid-container'>
                        {search_store.games.map(game =>
                            <Link key={game.id} to={'game/' + game.slug} reloadDocument>
                                <div className="game-card-cover-container">
                                    {game.cover != null ? <img src={game.cover} alt='' width="200" height="200" /> : <img src={require('../icons/img-not-found.png')} alt='' width="200" height="200" />}
                                    <div className="title-card-body">
                                        <div className="title-card">
                                            <span className="card-title">{game.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>)}
                    </div>
                </ModalWindow>
                <div className="dropdown">
                    {!auth_store.isAuth ? <>
                        <button className="dropbtn">
                            <FormattedMessage id="header.menu.login" />
                        </button>
                        <div className="dropdown-content">
                            <hr className='drop-down-line' />

                            <Link to={'/login'}>
                                <FormattedMessage id="header.menu.login" />
                            </Link>
                            <Link to={'/signup'}>
                                <FormattedMessage id="header.menu.signin" />
                            </Link>
                            <hr className='drop-down-line' />

                            <div className="theme-controller-desktop">
                                <p>
                                    <FormattedMessage id="header.menu.theme" />

                                </p>
                                <div className="toggle-pill-dark">
                                    <input type="checkbox" name="check" checked={checked} onChange={handleChange} />
                                    <label htmlFor="pill4"></label>
                                </div>
                            </div>
                        </div></>
                        :
                        <>
                            <button className="dropbtn">

                                {auth_store.user.img == null || auth_store.user.img == '' ?
                                    <img className='dropdown-img' src={require('../icons/user.png')} /> :
                                    <img className='dropdown-img' src={`data:image/jpeg;base64,${auth_store.user.img}`} width={20} height={20} />}
                                {auth_store.user.username}</button>

                            <div className="dropdown-content">
                                <hr className='drop-down-line' />
                                <Link to={`/${auth_store.user.username}`} reloadDocument>
                                    <FormattedMessage id="header.menu.profile" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/played?page=1`} reloadDocument>
                                    <FormattedMessage id="header.menu.passed" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/wants-to-play?page=1`} reloadDocument>
                                    <FormattedMessage id="header.menu.wanttoplay" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/liked?page=1`} reloadDocument>
                                    <FormattedMessage id="header.menu.liked" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/lists?page=1`} reloadDocument>
                                    <FormattedMessage id="header.menu.lists" />
                                </Link>
                                {auth_store.user.reporter ?
                                    <Link to={`/create/articles`} reloadDocument>
                                        <FormattedMessage id="header.menu.articles" />
                                    </Link>
                                    : null}
                                {auth_store.user.is_superuser ?
                                    <Link to={`/admin`} reloadDocument>
                                        <FormattedMessage id="header.menu.admin" />
                                    </Link>
                                    : null}

                                <hr className='drop-down-line' />
                                <Link to={`/${auth_store.user.username}/settings`} reloadDocument>
                                    <FormattedMessage id="header.menu.settings" />
                                </Link>
                                <Link to='/' onClick={() => auth_store.logout()}>
                                    <FormattedMessage id="header.menu.logout" />
                                </Link>
                                <div className="theme-controller-desktop">
                                    <p><FormattedMessage id="header.menu.theme" /></p>
                                    <div className="toggle-pill-dark">
                                        <input type="checkbox" name="check" checked={checked} onChange={handleChange} />
                                        <label htmlFor="pill4"></label>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>


            </header >
            <Outlet />

        </>
    )
}


export default observer(Header);