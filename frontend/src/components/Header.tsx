import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import '../styles/header.css'
import { useTheme } from '../hooks/useTheme';
import { FormattedMessage } from 'react-intl';


const Header: FC = () => {
    const { auth_store } = useContext(Context);
    const { theme, setTheme } = useTheme()
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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }
        if (theme == 'dark') {
            setChecked(true)
        }
    }, [auth_store])


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
                                <Link className="menu-link" to='/games/page/1'>
                                    <FormattedMessage id="header.menu.item1" />
                                </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/playlists'>
                                <FormattedMessage id="header.menu.item2" />
                            </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/news'>
                                <FormattedMessage id="header.menu.item3" />
                            </Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/reviews'>
                                <FormattedMessage id="header.menu.item4" />
                            </Link></li>
                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <Link to={'/' + auth_store.user.username} reloadDocument>{auth_store.user.username}</Link>
                            </li > </> : null}
                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <button onClick={() => auth_store.logout()}>
                                    <FormattedMessage id="header.menu.logout" />
                                </button>
                            </li></>
                                :
                                <> <li className="user-icon-desktop menu-item menu-link"><Link to={'/login'}>
                                    <FormattedMessage id="header.menu.login" />

                                </Link>/<Link to={'/signup'}>
                                        <FormattedMessage id="header.menu.signin" />
                                    </Link></li></>}
                            <li className="user-icon-desktop menu-item menu-link">
                                <div className="theme-controller-mobile">
                                    <div className="toggle-pill-dark">
                                        <input type="checkbox" id="pill4" name="check" checked={checked} onChange={handleChange} />
                                        <label htmlFor="pill4"></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>

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

                                {auth_store.user.img == null || auth_store.user.img == '' ? <img className='dropdown-img' src={require('../icons/user.png')} /> : <img className='dropdown-img' src={auth_store.user.img} />}
                                {auth_store.user.username}</button>

                            <div className="dropdown-content">
                                <hr className='drop-down-line' />
                                <Link to={`/${auth_store.user.username}`} reloadDocument>
                                    <FormattedMessage id="header.menu.profile" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/played`} reloadDocument>
                                    <FormattedMessage id="header.menu.passed" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/wants-to-play`} reloadDocument>
                                    <FormattedMessage id="header.menu.wanttoplay" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/liked`} reloadDocument>
                                    <FormattedMessage id="header.menu.liked" />
                                </Link>
                                <Link to={`/${auth_store.user.username}/lists`} reloadDocument>
                                    <FormattedMessage id="header.menu.lists" />
                                </Link>
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