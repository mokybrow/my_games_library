import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GamesPage } from './components/GamesPage';
import { NewsPage } from './components/NewsPage';
import { MainPage } from './components/MainPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { Profile } from './components/Profile';
import { AllLists } from './components/AllLists';
import { ReviewPage } from './components/ReviewPage';

function App() {

  return (
    <BrowserRouter>
    <MainPage/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="lists/all" element={<AllLists />} />
        <Route path="reviews" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
