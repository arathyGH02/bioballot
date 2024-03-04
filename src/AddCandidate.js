

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
    wardnumber: '',
    electionid: ''
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
  
    const formData = new FormData();
  
    // Append all the form data to the FormData object
    for (const key in candidateData) {
      if (candidateData[key] instanceof File) {
        // If the value is a File, append it to the FormData object
        formData.append(key, candidateData[key]);
      } else {
        // Otherwise, append the value as a string
        formData.append(key, candidateData[key]);
      }
    }
  
    try {
      const response = await fetch('http://localhost:5000/add-candidate', {
        method: 'POST',
        body: formData,
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

  return (

    <div> <Navbar />

<div className="add-candidate-container">
      <h2 className="add-candidate-title">Add New Candidate</h2>
      <form className="add-candidate-form" onSubmit={handleSubmit}>
        <label className="add-candidate-label" htmlFor="name">
          Name
        </label>
        <input className="add-candidate-input" type="text" id="name" required />

        <label className="add-candidate-label" htmlFor="party">
          Party
        </label>
        <input className="add-candidate-input" type="text" id="party" required/>

        <label className="add-candidate-label" htmlFor="symbol">
          Symbol
        </label>
        <input className="add-candidate-input" type="file" id="symbol"required />

        <label className="add-candidate-label" htmlFor="constituency">
          Constituency
        </label>
        <input className="add-candidate-input" type="text" id="constituency" />

        <label className="add-candidate-label" htmlFor="wardnumber">
          Ward Number
        </label>
        <input className="add-candidate-input" type="text" id="wardnumber" />

        <label className="add-candidate-label" htmlFor="electionid">
          Election ID
        </label>
        <input className="add-candidate-input" type="text" id="electionid" required/>

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
