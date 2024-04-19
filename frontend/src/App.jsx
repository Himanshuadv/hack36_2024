import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Home'

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
    </Routes>

   </BrowserRouter>
  )
}

export default App
