import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { SignupScreen } from './screens/SignupScreen';
import { LoginScreen } from './screens/LoginScreen';
import { api } from './api/api';
import { ProfileScreen } from './screens/ProfileScreen';



function App() {
  
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    (
      async () => {
        try {
          const response = await api.getUser()
          const data = response.data
          setFirstName(data.name)
        } catch (err) {
          console.log("login error");
        }
      })
      ()
  })
  return (

    <>
      <BrowserRouter>
        <Header firstName={firstName} setFirstName={setFirstName} />
        <Routes>
          <Route path='/' Component={() => <HomeScreen firstName={firstName} />} />
          <Route path='/signup' Component={SignupScreen} />
          <Route path='/login' Component={LoginScreen} />
          <Route path='/:username' Component={ProfileScreen} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
