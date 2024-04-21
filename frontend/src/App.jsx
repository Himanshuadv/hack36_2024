import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import SigninPage from "./Pages/SigninPage";
import LandingPage from "./Pages/LandingPage";
import ChatbotPage from "./Pages/ChatbotPage";
import ErrorPage from "./Pages/EroorPageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/" element={<SigninPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
