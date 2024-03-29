import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ElectionPage = () => {
    const [electionId, setElectionId] = useState('');
    const [candidates, setCandidates] = useState([]);

    const handleEnter = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/${electionId}/add-candidate`);

            console.log(response.data)
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    return (
      <div>
      <Navbar />
        <div>
          <label>Enter Election ID:</label>
            <input
                type="text"
                placeholder="Enter Election ID"
                value={electionId}
                onChange={(e) => setElectionId(e.target.value)}
            />
            <button onClick={handleEnter}>Enter</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Party</th>
                        <th>Constituency</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate._id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.party}</td>
                            <td>{candidate.constituency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ElectionPage;

