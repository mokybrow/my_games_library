import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AdminDashboard } from './pages/AdminDashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
