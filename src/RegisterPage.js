

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file for styling
import Navbar from './Navbar';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    aadhaar: '',
    age: '',
    dob: '',
    constituency: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Redirect to the home page
        window.location.href = '/';
      } else {
        throw new Error('Failed to save data');
      }
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };
  

  return (
    <div>  <Navbar />

    <div className="registration-container">
        <h2 className="centralized-heading">New Voter Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-column">
          <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="text" id="aadhaar" name="aadhaar" placeholder="Aadhaar" value={formData.aadhaar} onChange={handleChange} />
          <input type="text" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          <input type="text" id="dob" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
        </div>

        <div className="registration-column">
          
          <input type="text" id="constituency" name="constituency" placeholder="Constituency" value={formData.constituency} onChange={handleChange} />
          <input type="text" id="panchayath" name="panchayath" placeholder="Panchayath" value={formData.panchayath} onChange={handleChange} />
          <input type="text" id="municipality" name="municipality" placeholder="Municipality" value={formData.municipality} onChange={handleChange} />
          <input type="text" id="legislativeassembly" name="legislativeassembly" placeholder="Legislative Assembly" value={formData.legislativeassembly} onChange={handleChange} />
          <input type="text" id="voterid" name="voterid" placeholder="Voter ID" value={formData.voterid} onChange={handleChange} />
          <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        </form>
        <div className="next-button">
        <Link to="/"><button className='button2' type="submit">Save go to home page</button></Link>
           <Link to="/scanner">
             <button className='button2' type="button">Next</button>
          </Link>
        </div>
      
    </div>
    </div>
  );
};

export default RegisterPage;
