import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx'
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactUs.jsx';
import AdminDashboard from './pages/admindashboard/AdminDashboard.jsx';
import UserDashboard from './pages/user/UserDashboard.jsx';
import Details from './pages/user/Details.jsx';
import RentNow from './pages/user/RentNow.jsx';
import Checkout from './pages/payment/CheckOut.jsx';

import ForgotPassword from './pages/forgotpassword/ForgotPassword.jsx';
import Request from './pages/admindashboard/Request.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/rent-now" element={<RentNow />} />
        <Route path="/instrument/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/request" element={<Request/>} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;