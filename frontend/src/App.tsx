import React, { useContext, useEffect } from 'react';
import './App.css';
import { Context } from '.';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  const { auth_store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      auth_store.checkAuth()
    }
  }, [])


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<RegPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/:username' element={<ProfilePage/>} />
        </Routes>
      </Router>
    </>
  );

}

export default App;
