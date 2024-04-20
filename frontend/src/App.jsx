import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from './pages/Home'
import LandingPage from './Pages/LandingPage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route
            path="/home"
            element={
            
                // <HomePage />
                <LandingPage/>
              
            }
          />
    </Routes>

   </BrowserRouter>
  )
}

export default App
