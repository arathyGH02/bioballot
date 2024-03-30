import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './ElectionPage.css'; // Import the CSS file

const ElectionPage = () => {
    const [electionId, setElectionId] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const navigate = useNavigate();

    const handleEnter = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${electionId}/add-candidate`);
            console.log(response.data);
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleSelectCandidate = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const handleSubmitVote = () => {
        // Implement your logic to submit the vote
        console.log('Submitting vote for candidate:', selectedCandidate);
        // Reset the selected candidate after submitting the vote
        setSelectedCandidate('');
        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <div className="election-heading">
                <h1>Election - Cast Vote</h1>
            </div>
            <div>
                <div className="election-id-container">
                    <label className="election-id-label">Enter Election ID:</label>
                    <input
                        className="election-id-input"
                        type="text"
                        value={electionId}
                        onChange={(e) => setElectionId(e.target.value)}
                    />
                </div>
                <button className="Button1" onClick={handleEnter}>Enter</button>
                <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Constituency</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(candidate => (
                            <tr key={candidate._id}>
                                <td>{candidate.name}</td>
                                <td>{candidate.party}</td>
                                <td>{candidate.constituency}</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="candidate"
                                        value={candidate._id}
                                        onChange={() => handleSelectCandidate(candidate._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                    <button className="Button2" onClick={handleSubmitVote}>Submit Vote</button>
            
            </div>
        </div>
    );
};

export default ElectionPage;
