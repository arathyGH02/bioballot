import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ResultPage.css'; // Import the CSS file

const ResultPage = () => {
    const [electionId, setElectionId] = useState('');
    const [winner, setWinner] = useState(null);

    const handleGetWinner = async () => {
        try {
            console.log('Election ID:', electionId);
            const response = await axios.get(`http://localhost:5000/api/${electionId}/get-winner`);
            console.log(response.data);
            setWinner(response.data);
        } catch (error) {
            console.error('Error fetching winner:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="result-heading">
                <h1>Election Result</h1>
            </div>
            <div className="result-container">
                <label>Enter Election ID:</label>
                <input
                    type="text"
                    value={electionId}
                    onChange={(e) => setElectionId(e.target.value)}
                />
                <button onClick={handleGetWinner}>Get Winner</button>
                {winner && (
                    <div className="winner-info">
                        <p>Name: {winner.name}</p>
                        <p>Party: {winner.party}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
