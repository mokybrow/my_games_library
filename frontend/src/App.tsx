import React, { useContext, useEffect } from 'react';
import './App.css';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import  Header  from './components/Header';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])


  return (
    <>
    
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/signup' Component={RegPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/:username' Component={ProfilePage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
