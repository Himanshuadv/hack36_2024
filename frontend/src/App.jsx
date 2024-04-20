import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Home'
import SigninPage from './Pages/SigninPage';
import LandingPage from './Pages/LandingPage'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <BrowserRouter>
    <Routes>
    <Route
            path="/home"
            element={
            
                <HomePage />
              
            }
          />
    <Route
            path="/landing"
            element={
            
                <LandingPage />
              
            }
          />
    <Route
            path="/"
            element={
            
                <SigninPage />
              
            }
          />
    </Routes>
    <ToastContainer />
   </BrowserRouter>
   
    </>
   
  )
}

export default App
