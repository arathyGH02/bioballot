import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './CandidateList.css';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/add-candidate');
        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        } else {
          console.error('Failed to fetch candidates:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="candidate-list-container">
        <div className="header">
          <h3>Registered Candidates ({candidates.length})</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
              <th>Constituency</th>
              <th>Ward Number</th>
              <th>Election ID</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>{candidate.constituency}</td>
                <td>{candidate.wardnumber}</td>
                <td>{candidate.electionid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
