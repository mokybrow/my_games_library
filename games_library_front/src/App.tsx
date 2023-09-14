import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GamesPage } from './pages/GamesPage';
import { NewsPage } from './pages/NewsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Profile } from './pages/Profile';
import { AllLists } from './pages/AllLists';
import { ReviewPage } from './pages/ReviewPage';
import { Header } from './components/Header';
import { MainPage } from './pages/MainPage';

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="lists/all" element={<AllLists />} />
        <Route path="reviews" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
