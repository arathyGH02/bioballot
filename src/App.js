//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import VoterLoginPage from './VoterLoginPage';
import AdminLoginPage from './AdminLoginPage';
import FingerprintScanner from './FingerprintScanner';
function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/voter-login" element={<VoterLoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/scanner" element={<FingerprintScanner />} />
        </Routes>
      </Router>
  );
}

export default App;
