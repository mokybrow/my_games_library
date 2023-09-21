import React, { SyntheticEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { removeLocalToken } from '../api/utils';
import { api } from '../api/api';

interface Props {
  firstName: string;
  setFirstName: (firstName: string) => void
}

const Header = ({ firstName, setFirstName }: Props) => {
  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await api.Logout();
    removeLocalToken();
    setFirstName('')
  }

  return (
    <>
      <header className="header">
        <div className="top-left">
          <Link className="header-logo" to="/">GAMIFICATION</Link>
        </div>
        <div className="header-menu menu">
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="menu-body">
            <ul className="menu-list">
              <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to="/">GAMIFICATION</Link></li>
              <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to="/">GAMIFICATION</Link></li>
              <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to="/">GAMIFICATION</Link></li>
              <li className="menu-item" id="menu-item-transition"><Link className="menu-link" to="/">GAMIFICATION</Link></li>

            </ul>
          </nav>
        </div>
        <div className="social-icons">
          {firstName ? (<Link className="menu-link" to='/' onClick={logoutHandler}>{firstName}</Link>) : (<><Link className="menu-link" to="/login">Login</Link><Link className="menu-link" to="/signup">Signup</Link></>)}
        </div>
      </header>
    </>



  )
}

export default Header