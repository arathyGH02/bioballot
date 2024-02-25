// src/AdminLoginPage.js
import React, { useState } from 'react';
import Navbar from './Navbar';
 import './AdminLoginPage.css'; 
 import {Link} from 'react-router-dom';

  const AdminLoginPage = () => {
    // Add your voter login logic here
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
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
          <button className='button1' type="submit">
          <Link to="/admin">Login</Link>
          </button>
        </form>
      </div>
  
  
  
      </div>
    );
  }
  


export default AdminLoginPage;
