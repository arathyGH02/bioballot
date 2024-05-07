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
    const [voterId, setVoterId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVoteAlreadySubmitted, setIsVoteAlreadySubmitted] = useState(false);

    const navigate = useNavigate();

    const handleEnter = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${electionId}/add-candidate`);
            console.log(response.data);
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            setErrorMessage('Failed to fetch candidates. Please try again.'); // Set error message
        }
    };

    const handleSelectCandidate = (candidateId) => {
        console.log('Selected candidate:', candidateId);
        setSelectedCandidate(candidateId);
    };

    const handleSubmitVote = async () => {
        console.log('Submitting vote for voterId:', voterId, 'electionId:', electionId, 'and candidateId:', selectedCandidate);
        try {
            const response = await axios.post('http://localhost:5000/api/submit-vote', {
                voterId,
                electionId,
                candidateId: selectedCandidate
            });
            if (response.status === 200) {
                setIsVoteSubmitted(true);
                window.alert('Vote submitted successfully'); // Display alert for successful submission
                navigate('/');
            }
        } catch (error) {
            console.error('Error submitting vote:', error.response.data.error);
            if (error.response.status === 400 && error.response.data.error === 'Voter has already casted their vote') {
                setIsVoteAlreadySubmitted(true); // Set state to indicate vote already submitted
            } else {
                setIsVoteSubmitted(false);
                setErrorMessage('Failed to submit vote. Please try again.'); // Set error message
            }
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
                    <br/>
                    <label className="voter-id-label">Enter Voter ID:</label>
                    <input
                        className="voter-id-input"
                        type="text"
                        value={voterId}
                        onChange={(e) => setVoterId(e.target.value)}
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
                <button className="Button2" onClick={handleSubmitVote} disabled={!selectedCandidate}>
                    Submit Vote
                </button>
                {isVoteAlreadySubmitted && <p className="error-message">You have already submitted your vote.</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ElectionPage;
