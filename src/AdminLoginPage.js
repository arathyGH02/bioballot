// src/AdminLoginPage.js
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './Navbar';
import './AdminLoginPage.css'; 
import axios from 'axios'; 
 

  const AdminLoginPage = () => {
    // Add your voter login logic here
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     const [loginError, setLoginError] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/admin-login', {
          username,
          password
        });
        console.log(response.data)
        if (response.data.success) {
          // Login successful, redirect or show success message
          console.log('Login successful');
          console.log(response.data);
          
          navigate("/admin");
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
        <h2>Admin Login</h2>
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
  


export default AdminLoginPage;
