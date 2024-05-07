import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import './FingerRegister.css';
import axios from 'axios';

const FingerRegister = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const scannerRef = useRef(null);
  const [fingerprintImage, setFingerprintImage] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFingerprintImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextButtonClick = async () => {
    // Assuming 'fingerprintImage' is the base64 encoded image data you want to store in the database
    const fingerprintImageBlob = await fetch(fingerprintImage).then(res => res.blob()); // Convert data URL to Blob

    // Create a FormData object and append the fingerprint image blob and voterId
    const formData = new FormData();
    formData.append('voterId', voterId);
    formData.append('fingerprintImage', fingerprintImageBlob, 'fingerprintImage.bmp'); // Use the correct filename extension for BMP format

    // Send a POST request to your backend API to store the captured fingerprint data along with the voter ID
    try {
      const response = await axios.post('http://localhost:5000/api/fingerprint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from backend:', response.data.message);
      navigate('/');
    } catch (error) {
      setRegistrationStatus('Failed to upload fingerprint image');
      console.error('Failed to upload fingerprint image:', error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="fingerprint-scanner-container">
        <h2 className="scanner-title">Fingerprint Scanner</h2>
        <input classname="folder" type="file" accept="image/*" onChange={handleUpload} />
        {fingerprintImage && <img src={fingerprintImage} alt="Fingerprint" className="fingerprint-image" />}
        {registrationStatus && <p>{registrationStatus}</p>}
        <label htmlFor="voterId" className="voterid">Voter ID:</label>
        <input
          type="text"
          id="voterId"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Enter Voter ID"
          className="voteridinput"
        />
        <button className="scan-button" onClick={handleNextButtonClick} disabled={!fingerprintImage || !voterId}>
          NEXT
        </button>
        <div ref={scannerRef}></div>
      </div>
    </div>
  );
};

export default FingerRegister;
