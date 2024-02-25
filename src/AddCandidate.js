

import React, { useState } from 'react';
import Navbar from './Navbar';
import './AddCandidate.css';

const AddCandidate = () => {
  // Handle form submission logic here
  const [candidateData, setCandidateData] = useState({
    name: '',
    party: '',
    symbol: null, // Assume symbol is a file
    constituency: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setCandidateData((prevData) => ({
      ...prevData,
      [name]: name === 'symbol' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate sending data to the backend and updating the database
      // Replace this with your actual API call
      const response = await fetch('your-backend-api-endpoint', {
        method: 'POST',
        body: JSON.stringify(candidateData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Candidate added successfully!');
      } else {
        setMessage('Failed to add candidate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
//form submission logic ends here


  return (

    <div> <Navbar />

<div className="add-candidate-container">
      <h2 className="add-candidate-title">Add New Candidate</h2>
      <form className="add-candidate-form" onSubmit={handleSubmit}>
        <label className="add-candidate-label" htmlFor="name">
          Name
        </label>
        <input className="add-candidate-input" type="text" id="name" />

        <label className="add-candidate-label" htmlFor="party">
          Party
        </label>
        <input className="add-candidate-input" type="text" id="party" />

        <label className="add-candidate-label" htmlFor="symbol">
          Symbol
        </label>
        <input className="add-candidate-input" type="file" id="symbol" />

        <label className="add-candidate-label" htmlFor="constituency">
          Constituency
        </label>
        <input className="add-candidate-input" type="text" id="constituency" />

        <button className="add-candidate-button" type="submit">
          Add Candidate
        </button>
      </form>

      {message && <p className="add-candidate-message">{message}</p>}
    </div>

    </div>
  );
};

export default AddCandidate;
