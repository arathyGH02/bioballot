import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './ElectionPage.css'; // Import the CSS file

const ElectionPage = () => {
    const [electionId, setElectionId] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);
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
        console.log('Selected candidate:', candidateId);
        setSelectedCandidate(candidateId);
    };

    const handleSubmitVote = async () => {
        console.log('Submitting vote for electionId:', electionId, 'and candidateId:', selectedCandidate);
        try {
            await axios.post('http://localhost:5000/api/submit-vote', {
                electionId,
                candidateId: selectedCandidate
            });
            setIsVoteSubmitted(true);
            navigate('/'); 
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
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
    onChange={(e) => {
        console.log('Selected candidate:', e.target.value);
        handleSelectCandidate(e.target.value);
    }}
/>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                    <button className="Button2" onClick={handleSubmitVote}>Submit Vote</button>
            
            </div>
        </div>
    );
};

export default ElectionPage;
