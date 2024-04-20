import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Home'
import SigninPage from './Pages/SigninPage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route
            path="/home"
            element={
            
                <HomePage />
              
            }
          />
    <Route
            path="/"
            element={
            
                <SigninPage />
              
            }
          />
    </Routes>

   </BrowserRouter>
  )
}

export default App
