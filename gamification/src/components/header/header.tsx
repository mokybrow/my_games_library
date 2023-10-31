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
                                <div>fd,l;,f;sld,</div>
                                <div>fd,l;,f;sld,</div>
                                <div>fd,l;,f;sld,</div>
                                <div>fd,l;,f;sld,</div>
                            </div>
                        </ul>

                    </nav>
                </div>
                <div className="dropdown-menu">
                    <>
                        <DropdownButtonContent userImg={auth_store.user.img} username={auth_store.user.username} />
                        <DropdownContent>
                            <hr className='dropdown-line' />
                            <Link to={`/${auth_store.user.username}`} reloadDocument>
                                Элемент
                            </Link>
                            <Link to={`/${auth_store.user.username}/played?page=1`} reloadDocument>
                                Элемент
                            </Link>
                            <Link to={`/${auth_store.user.username}/wants-to-play?page=1`} reloadDocument>
                                Элемент
                            </Link>
                        </DropdownContent >
                    </>
                </div>

            </header>
            <Outlet />
        </>
    )
}

export default observer(Header);
