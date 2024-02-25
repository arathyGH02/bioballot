//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import VoterLoginPage from './VoterLoginPage';
import AdminLoginPage from './AdminLoginPage';
import FingerprintScanner from './FingerprintScanner';
import RegisterPage from './RegisterPage';
import Admin from './Admin';
import AddCandidate from './AddCandidate';
import VoterDetails from './VoterDetails';
import ElectionPage from './ElectionPage';

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/voter-login" element={<VoterLoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/scanner" element={<FingerprintScanner />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/voter-details" element={<VoterDetails />} />
        <Route path="/election-page" element={<ElectionPage />} />
        </Routes>
      </Router>
  );
}

export default App;
