import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import '../styles/header.css'
import { useTheme } from '../hooks/useTheme';


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
                    <Link className="header-logo" to='/'>ЛОГО</Link>
                </div>
                <div onClick={buttonFunc} className="header-menu menu">
                    <div className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="menu-body">
                        <ul className="menu-list">
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/games/page/1'>Игры</Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/playlists'>Плейлисты</Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/news'>Новости</Link></li>
                            <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to='/reviews'>Отзывы</Link></li>
                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <Link to={'/' + auth_store.user.username} reloadDocument>{auth_store.user.username}</Link>
                            </li > </> : null}
                            {auth_store.isAuth ? <><li className="user-icon-desktop menu-item menu-link">
                                <button onClick={() => auth_store.logout()}>Выход</button>
                            </li></> 
                            : 
                            <> <li className="user-icon-desktop menu-item menu-link"><Link to={'/login'}>Войти</Link>/<Link to={'/signup'}>Зарегистрироваться</Link></li></>}
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
                        <button className="dropbtn">Войти</button>
                        <div className="dropdown-content">
                            <hr className='drop-down-line' />

                            <Link to={'/login'}>Войти</Link>
                            <Link to={'/signup'}>Регистрация</Link>
                            <hr className='drop-down-line' />

                            <div className="theme-controller-desktop">
                                <p>Тема</p>
                                <div className="toggle-pill-dark">
                                    <input type="checkbox" id="pill4" name="check" checked={checked} onChange={handleChange} />
                                    <label htmlFor="pill4"></label>
                                </div>
                            </div>
                        </div></>
                        :
                        <>
                            <button className="dropbtn"><img className='dropdown-img' src="https://media.rawg.io/media/screenshots/bcf/bcf0dcaccca70632bd312282246a0078.jpg" alt="" />
                                {auth_store.user.username}</button>

                            <div className="dropdown-content">
                                <hr className='drop-down-line' />
                                <Link to={`/${auth_store.user.username}`} >Профиль</Link>
                                <Link to={`/${auth_store.user.username}/played`} >Пройденные</Link>
                                <Link to={`/${auth_store.user.username}/wants-to-play`} >Пройду</Link>
                                <Link to={`/${auth_store.user.username}/liked`} >Понравились</Link>
                                <Link to={`/${auth_store.user.username}/lists`} >Списки</Link>
                                <hr className='drop-down-line' />
                                <Link to={`/${auth_store.user.username}/settings`} >Настройки</Link>
                                <Link to='/' onClick={() => auth_store.logout()}>Выход</Link>
                                <div className="theme-controller-desktop">
                                    <p>Тема</p>
                                    <div className="toggle-pill-dark">
                                        <input type="checkbox" id="pill4" name="check" checked={checked} onChange={handleChange} />
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