import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file for styling
import Navbar from './Navbar';


const VoterList = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        setVoters(response.data);
       
      } catch (error) {
        console.error('Failed to fetch voters:', error.message);
      }
    };

    fetchVoters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Calculate the minimum allowable birth year based on the age
  const currentYear = new Date().getFullYear();
  const minBirthYear = currentYear - data.age;

  // Get the birth year from the date of birth input
  const dobYear = parseInt(data.dob.split("-")[0]);

  // Validate that the birth year matches the calculated minimum birth year
  if (dobYear !== minBirthYear) {
    window.alert("Please enter a valid date of birth for the given age.");
    return;
  }
  const legalVotingAge = 18;
  if (data.age < legalVotingAge) {
    window.alert("You must be at least 18 years old to register as a voter.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/register', data);

    if (response.data.message === 'Voter already registered') {
      window.alert("You are already registered as a voter.");
    } else if (response.status !== 200) {
      throw new Error('Failed to register');
    }

    // Assuming the server responds with a JSON object containing a success message
    console.log(response.data.message); // Log the success message
    window.alert(response.data.message);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};
  return (
    <div>
      <Navbar />
      <div className="registration-container">
        <h2>New Voter Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="registration-column">
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="tel" name="phoneNumber" pattern="[0-9]{10}" required />
            </label>
            <br />
            <label>
              Aadhaar:
              <input type="text" name="aadhaar"  pattern="[0-9]{12}" required />
            </label>
            <br />
            <label>
              Age:
              <input type="number" name="age" required />
            </label>
            <br />
            <label>
              Date of Birth:
              <input type="date" name="dob" required />
            </label>
            <br />
          </div>
  
          <div className="registration-column">
            <label>
              Constituency:
              <input type="text" name="constituency" required />
            </label>
            <br />
            <label>
              Panchayath:
              <input type="text" name="panchayath" />
            </label>
            <br />
            <label>
              Municipality:
              <input type="text" name="municipality" />
            </label>
            <br />
            <label>
              Legislative Assembly:
              <input type="text" name="legislativeassembly" required />
            </label>
            <br />
            <label>
              Voter ID:
              <input type="text" name="voterid" required />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" required />
            </label>
            <br />
          </div>
          <div>
            <button className="button2" type="submit">Register</button>
          
          </div>
          <div> <Link to="/face-register" style= {{ textDecoration: 'none' }}><button className="button3" >Next</button></Link></div>
        </form>
      </div>
    </div>
  );
  }
export default VoterList;
