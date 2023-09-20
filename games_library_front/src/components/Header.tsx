import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { removeLocalToken } from '../api/utils';
import { api } from '../api/api';

interface Props{
    firstName: string;
    setFirstName: (firstName: string) => void
}

const Header = ({firstName, setFirstName}:Props) => {
    const logoutHandler= async (e: SyntheticEvent) => {
        e.preventDefault();
        // removeLocalToken();

        const response = await api.Logout();
        setFirstName('')
    }
  return (
    <nav>
        <ul>
            <li><Link to="/">Home page</Link></li>
           { firstName? (<li><Link to='/' onClick={logoutHandler}>Logout</Link></li>):(<><li><Link to="/login">Login page</Link></li><li><Link to="/signup">Signup page</Link></li></>)}

        </ul>
    </nav>
  )
}

export default Header