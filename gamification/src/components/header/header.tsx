import React, { FC, useContext } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import './header.css'
import { Context } from '../..'
import { observer } from 'mobx-react-lite';
import { DropdownContent } from '../dropdown/dropdown'
import { DropdownButtonContent } from '../buttons/dropdown-button'

const Header: FC = () => {

    const { auth_store } = useContext(Context);

    const buttonFunc = () => {

        const menu = document.querySelector('.menu-body')
        const menuBtn = document.querySelector('.menu-icon')
        const body = document.body;

        const mediaQuery = window.matchMedia('(min-width: 1000px)')
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
            <header>
                <div className="header-logo">
                    {/* <img className='logo-img' src={require('../../assets/img/tomloading.png')} alt="logo" width={32} height={32}/> */}
                    <Link to='/'>Чуваки</Link>
                </div>
                <div onClick={buttonFunc} className="header-menu menu">
                    <div className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="menu-body">
                        <ul className="menu-list">
                        <li className="menu-item" >  <Link to='/games' className="menu-link" reloadDocument>Игры</Link></li>
                        <li className="menu-item" >  <Link to='/lists' className="menu-link" reloadDocument>Списки</Link></li>
                        <li className="menu-item" > <Link to='/news' className="menu-link" reloadDocument>Новости</Link></li>
                        <li className="menu-item" ><Link to='/reviews' className="menu-link" reloadDocument>Обзоры</Link></li>
                            <li className="menu-item search-desktop">
                                <Link to='/search' className="menu-link" reloadDocument>
                                    <img src={require('../../assets/icons/search.png')} alt="" width={24} height={24} />
                                </Link>
                            </li>
                            <li className="menu-item search-mobile">
                                <Link to='/search' className="menu-link" reloadDocument>
                                    Поиск
                                    <img src={require('../../assets/icons/search.png')} alt="" width={24} height={24} />
                                </Link>
                            </li>
                            <div className="nav-grid-wrap">
                                {auth_store.isAuth ?
                                    <>
                                        <Link to={`/${auth_store.user.username}`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/profile.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Профиль</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/settings`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/settings.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Настройки</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/lists/create`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/createlist.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Создать список</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/favorite`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/favorite.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Понравились</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/wishlist`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/wishlist.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Пройду</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/completed`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/completed.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Пройденные</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/lists`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/mylists.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Мои списки</span>
                                            </div>
                                        </Link>
                                        {auth_store.user.reporter == true ?
                                            <Link to='/article/create' className="menu-link">
                                                <div className='menu-item-icon'>
                                                    <img src={require('../../assets/headericons/createarticle.png')} alt="" width={54} height={54} />
                                                    <span className='menu-icon-title'>Написать статью</span>
                                                </div>
                                            </Link> : null}

                                        <Link to='/' className="menu-link" onClick={auth_store.logout}>
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/headericons/exit.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Выход</span>
                                            </div>
                                        </Link>
                                    </> :
                                    <>
                                        <Link to='/login' className="menu-link">
                                            <div className='menu-item-icon'>
                                            <img src={require('../../assets/headericons/profile.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Вход</span>
                                            </div>
                                        </Link>
                                        <Link to='/registration' className="menu-link">
                                            <div className='menu-item-icon'>
                                            <img src={require('../../assets/headericons/signin.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Регистрация</span>
                                            </div>
                                        </Link>
                                    </>

                                }
                            </div>
                        </ul>

                    </nav>
                </div>
                <div className="dropdown-menu">
                    {auth_store.isAuth ?
                        <>
                            <DropdownButtonContent userImg={auth_store.user.img} username={auth_store.user.username} />
                            <DropdownContent>
                                <hr className='dropdown-line' />
                                <Link to={`/${auth_store.user.username}`} reloadDocument>
                                    Профиль
                                </Link>
                                <Link to={`/${auth_store.user.username}/favorite`} reloadDocument>
                                    Любимые
                                </Link>
                                <Link to={`/${auth_store.user.username}/wishlist`} reloadDocument>
                                    Пройду
                                </Link>
                                <Link to={`/${auth_store.user.username}/completed`} reloadDocument>
                                    Пройденные
                                </Link>

                                <Link to={`/${auth_store.user.username}/lists`} reloadDocument>
                                    Списки
                                </Link>
                                <Link to={`/${auth_store.user.username}/lists/create`} reloadDocument>
                                    Создать список
                                </Link>
                                {auth_store.user.reporter ?
                                    <Link to='/article/create' reloadDocument>
                                        Написать статью
                                    </Link> : null}

                                <hr className='dropdown-line' />
                                <Link to={`/${auth_store.user.username}/settings`} reloadDocument>
                                    Настройки
                                </Link>
                                <Link to='/' onClick={auth_store.logout}>
                                    Выход
                                </Link>
                            </DropdownContent >
                        </> : <>
                            <DropdownButtonContent userImg={auth_store.user.img} username={auth_store.user.username} />
                            <DropdownContent>
                                <Link to='/login' reloadDocument>
                                    Войти
                                </Link>
                                <Link to='/registration' reloadDocument>
                                    Зарегистрироваться
                                </Link>
                            </DropdownContent>
                        </>}
                </div>

            </header>
            <Outlet />
        </>
    )
}

export default observer(Header);
