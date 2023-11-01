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
        const mediaQuery = window.matchMedia('(min-width: 800px)')
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
                    <Link to='/'>Bear</Link>
                </div>
                <div onClick={buttonFunc} className="header-menu menu">
                    <div className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="menu-body">
                        <ul className="menu-list">
                            <Link to='/games' className="menu-link"><li className="menu-item" >Игры</li></Link>
                            <Link to='/lists' className="menu-link"><li className="menu-item" >Списки</li></Link>
                            <Link to='/news' className="menu-link"><li className="menu-item" >Новости</li></Link>
                            <Link to='/reviews' className="menu-link"><li className="menu-item" >Обзоры</li></Link>
                            <div className="nav-grid-wrap">
                                {auth_store.isAuth ?
                                    <>
                                        <Link to={`/${auth_store.user.username}`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Профиль</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/settings`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Настройки</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/create_list`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Создать список</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/favorite`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Понравились</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/wishlist`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Пройду</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/completed`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Пройденные</span>
                                            </div>
                                        </Link>
                                        <Link to={`/${auth_store.user.username}/lists`} className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Мои списки</span>
                                            </div>
                                        </Link>
                                    </> :
                                    <>
                                        <Link to='/login' className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
                                                <span className='menu-icon-title'>Вход</span>
                                            </div>
                                        </Link>
                                        <Link to='/registration' className="menu-link">
                                            <div className='menu-item-icon'>
                                                <img src={require('../../assets/icons/icon.png')} alt="" width={54} height={54} />
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
