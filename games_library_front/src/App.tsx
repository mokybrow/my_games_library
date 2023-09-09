import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne } from './components/PageOne';
import { PageTwo } from './components/PageTwo';
import { MainPage } from './components/MainPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { Profile } from './components/Profile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
