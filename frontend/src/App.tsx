import React, { useContext, useEffect } from 'react';
import './App.css';
import { Context } from '.';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { GamesPage } from './pages/GamesPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { NewsPage } from './pages/NewsPage';
import { ReviewsPage } from './pages/ReviewsPage';

function App() {
  const { auth_store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      auth_store.checkAuth()
    }
  }, [auth_store])


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<RegPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/:username' element={<ProfilePage/>} />
          <Route path='/games/' element={<GamesPage/>} />
          <Route path='/playlists/' element={<PlaylistsPage/>} />
          <Route path='/news/' element={<NewsPage/>} />
          <Route path='/reviews/' element={<ReviewsPage/>} />
        </Routes>
      </Router>
    </>
  );

}

export default App;
