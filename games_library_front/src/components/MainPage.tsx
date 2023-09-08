import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const MainPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/one'>Page One</Link>
          </li>
          <li>
            <Link to='/two'>Page Two</Link>
          </li>
          <li>
            <Link to='/login'>Login Page</Link>
          </li>
          <li>
            <Link to='/sign_up'>SignUp Page</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  )
};