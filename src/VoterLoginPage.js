import React, { useState } from 'react';
import Navbar from './Navbar';

import './VoterLoginPage.css';

const VoterLoginPage = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, aadhaarNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, handle the response
       console.log("successful")
      } else {
        // Login failed, handle the error
        console.log("error")
      }
    } catch (error) {
      // Handle network or other errors
      console.log("error");
    }
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