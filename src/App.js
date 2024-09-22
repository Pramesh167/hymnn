import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx'
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactUs.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;