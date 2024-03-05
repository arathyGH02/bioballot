import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './VoterList.css';

const VoterList = () => {
    
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch('http://localhost:5000/register');
        if (response.ok) {
          const data = await response.json();
          setVoters(data);
        } else {
          console.error('Failed to fetch voters:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="voter-list-container">
        <div className="header">
          <h3>Registered Voters ({voters.length})</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Aadhaar</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index}>
                <td>{voter.name}</td>
                <td>{voter.email}</td>
                <td>{voter.aadhaar}</td>
                <td>{voter.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoterList;
