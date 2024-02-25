// src/VoterDetails.js

import React, { useState, useEffect } from 'react';
import './VoterDetails.css'; // You can create this CSS file for styling
import Navbar from './Navbar';

const VoterDetails = () => {
  // State to store voter details
  const [voterDetails, setVoterDetails] = useState(null);

  // Fetch voter details from the backend when the component mounts
  useEffect(() => {
    const fetchVoterDetails = async () => {
      try {
        // Replace 'your-backend-api-endpoint' with the actual endpoint to fetch voter details
        const response = await fetch('your-backend-api-endpoint', {
          method: 'GET',
          headers: {
            // Include any necessary headers, e.g., authentication token
            // 'Authorization': 'Bearer YOUR_TOKEN',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVoterDetails(data);
        } else {
          console.error('Failed to fetch voter details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVoterDetails();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleVoteClick = () => {
    // Handle the logic to navigate to the voting page or cast the vote
    console.log('Vote button clicked!');
  };

  return (

    <div> <Navbar />

    <div className="voter-details-container">
      <h2 className="voter-details-title">Voter Details</h2>

      {voterDetails ? (
        <div className="voter-details-content">
          <p className="voter-details-info">
            <strong className="voter-details-label">Name:</strong>{' '}
            {voterDetails.name}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Email:</strong>{' '}
            {voterDetails.email}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Phone Number:</strong>{' '}
            {voterDetails.phoneNumber}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Aadhaar Number:</strong>{' '}
            {voterDetails.aadhaarNumber}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Age:</strong>{' '}
            {voterDetails.age}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Date of Birth:</strong>{' '}
            {voterDetails.dateofbirth}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Constituency:</strong>{' '}
            {voterDetails.constituency}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Panchayath:</strong>{' '}
            {voterDetails.panchayath}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Municipality:</strong>{' '}
            {voterDetails.municipality}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Legislative Assembly:</strong>{' '}
            {voterDetails.legislativeAssembly}
          </p>
          <p className="voter-details-info">
            <strong className="voter-details-label">Voter ID:</strong>{' '}
            {voterDetails.voterid}
          </p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p className="voter-details-loading">Loading voter details...</p>
      )}

      <button
        className="voter-details-vote-button"
        onClick={handleVoteClick}
        disabled={!voterDetails} // Disable the button if voter details are not loaded
      >
        Vote Now
      </button>
    </div>
    </div>
  );
};

export default VoterDetails;
