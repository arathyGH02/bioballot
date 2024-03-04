import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios'; // Import axios for HTTP requests
import './VoterLoginPage.css';

const VoterLoginPage = () => {
  const [username, setUsername] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:5000/voter-login', {
        username,
        aadhaarNumber,
        password,
      });
      console.log(response.data)
      if (response.data.success) {
        // Login successful, redirect or show success message
        console.log('Login successful');
        console.log(response.data)
        window.alert('Login successful');
        navigate('/scanner');
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='login'>
        <h2>Voter Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Name</label>
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
          {loginError && <p className="error-message">{loginError}</p>}
          <button className='button1' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default VoterLoginPage;
