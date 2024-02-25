// src/ElectionPage.js

import React, { useState } from 'react';
import './ElectionPage.css'; // You can create this CSS file for styling
import Navbar from './Navbar';

const candidatesData = [
  // Replace with your actual candidate data
  { id: 1, name: 'Candidate 1', party: 'Party A', constituency: 'Constituency X', symbol: 'Symbol A' },
  { id: 2, name: 'Candidate 2', party: 'Party B', constituency: 'Constituency Y', symbol: 'Symbol B' },
  // Add more candidates as needed
];

const ElectionPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleVoteSubmission = () => {
    // Assume you have a function to submit the vote to the backend here

    // Display a pop-up message
    alert('Your vote is successfully saved!');

    // Set a delay before navigating to the home page
    setTimeout(() => {
      // Navigate to the home page or use React Router for navigation
      window.location.href = '/';
    }, 2000); // 3000 milliseconds (3 seconds) delay
  };

  return (

    <div> <Navbar />

    <div className="election-page-container">
      <h2 className="election-page-title">Election</h2>
      <h3 className="election-page-subtitle">Cast Your Vote</h3>

      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Constituency</th>
            <th>Symbol</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {candidatesData.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.constituency}</td>
              <td>{candidate.symbol}</td>
              <td>
                <input
                  type="radio"
                  name="selectedCandidate"
                  checked={selectedCandidate === candidate.id}
                  onChange={() => handleCandidateSelection(candidate.id)}
                  disabled={voteSubmitted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="submit-vote-button-container">
        <button
          className="submit-vote-button"
          onClick={handleVoteSubmission}
          disabled={!selectedCandidate || voteSubmitted}
        >
          Submit Vote
        </button>
      </div>
    </div>
    </div>
  );
};

export default ElectionPage;
