import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


const FacialRecognition = () => {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerifyFaceClick = async () => {
    // Send the voter ID to the backend for verification
    if (voterId) {
      try {
        const response = await axios.post('http://localhost:5000/verify-facial-image', { voterId });
        if (response.status === 200) {
          navigate('/election-page'); // Update to the actual path of your ElectionPage
       } else if(response.status === 400) {
          setErrorMessage('Failed to verify facial image. Please try again.');
        }
      } catch (error) {
        console.error('Failed to verify facial image:', error.message);
        setErrorMessage('Failed to verify facial image. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="facial-recognition-container">
        <h2 className="recognition-title">Facial Recognition</h2>
        <p className="recognition-message">Enter your voter ID for facial verification</p>
        <br />
        <label>
          Voter ID:
          <input className="label-field" type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
        </label>
        <br />
        <button className="verify-button" onClick={handleVerifyFaceClick} disabled={!voterId}>
          Verify Face
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FacialRecognition;
