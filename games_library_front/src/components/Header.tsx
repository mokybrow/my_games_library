import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/MainPage.css';

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="top-left">
          <Link to='/' className="header-logo">Геймификация</Link>
        </div>
        <div className="header-menu menu">
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="menu-body">
            <ul className="menu-list">
              <li className="menu-item" id="menu-item-transition">
                <Link to='/games' className="menu-link">Игры</Link>
              </li>
              <li className="menu-item" id="menu-item-transition">
                <Link to='/lists/all' className="menu-link">Списки</Link>
              </li>
              <li className="menu-item" id="menu-item-transition">
                <Link to='/news' className="menu-link">Новости</Link>
              </li>
              <li className="menu-item" id="menu-item-transition">
                <Link to='/reviews' className="menu-link">Отзывы</Link>
              </li>

            </ul>
          </nav>
        </div>
        <div className="social-icons">
          <li className="menu-item" id="menu-item-transition">
            <Link to='/login' className="menu-link">Log In</Link>
          </li>
        </div>
      </header>
      <Outlet />
    </>
  )
};