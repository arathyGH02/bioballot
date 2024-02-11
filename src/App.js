//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import VoterLoginPage from './VoterLoginPage';
import AdminLoginPage from './AdminLoginPage';
function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/voter-login" element={<VoterLoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        </Routes>
      </Router>
  );
}

export default App;
