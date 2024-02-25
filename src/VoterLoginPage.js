// src/VoterLoginPage.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import './VoterLoginPage.css';

const VoterLoginPage = () => {
  // Add your voter login logic here
  const [username, setUsername] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAadhaarNumberChange = (event) => {
    setAadhaarNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here, such as sending login credentials to the server for authentication
  };

  return (
    <div>
        <Navbar />
      
      
    <div className='login'>
      <h2>Voter Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="aadhaarNumber">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaarNumber"
            value={aadhaarNumber}
            onChange={handleAadhaarNumberChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='button1' type="submit">Login</button>
      </form>
    </div>



    </div>
  );
}

export default VoterLoginPage;
