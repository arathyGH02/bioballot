import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import './FingerprintScanner.css';
import axios from 'axios';

const FingerprintScanner = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const scannerRef = useRef(null);
  const [fingerprintImage, setFingerprintImage] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

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
    // Assuming 'fingerprintImage' is the base64 encoded image data you want to verify in the database
    const fingerprintImageBlob = await fetch(fingerprintImage).then(res => res.blob()); // Convert data URL to Blob

    // Create a FormData object and append the fingerprint image blob and voterId
    const formData = new FormData();
    formData.append('voterId', voterId);
    formData.append('fingerprintImage', fingerprintImageBlob, 'fingerprintImage.bmp'); // Use the correct filename extension for BMP format

    // Send a POST request to your backend API to verify the fingerprint data along with the voter ID
    try {
      const response = await axios.post('http://localhost:5000/api/verify-fingerprint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from backend:', response.data.message);
      if (response.status === 200) {
        console.log('Fingerprint verification successful');
        setVerificationStatus('Fingerprint verification successful');
        window.alert('Fingerprint verification successful'); // Display alert for successful verification
        // Navigate to the next page if verification is successful
        navigate('/facial-recognition');
      } else {
        console.error('Fingerprint verification failed');
        setVerificationStatus('Fingerprint verification failed');
        window.alert('Fingerprint verification failed'); // Display alert for failed verification
      }
    } catch (error) {
      console.error('Error verifying fingerprint:', error.message);
      setVerificationStatus('Error verifying fingerprint');
    }
  };


  return (
    <div>
      <Navbar />
      <div className="fingerprint-scanner-container">
        <h2 className="scanner-title">Fingerprint Scanner</h2>
        <label htmlFor="voterId">Voter ID:</label>
        <input
          type="text"
          id="voterId"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Enter Voter ID"
        />
        <input type="file" accept="image/*" onChange={handleUpload} />
        {fingerprintImage && <img src={fingerprintImage} alt="Fingerprint" className="fingerprint-image" />}
        {verificationStatus && <p>{verificationStatus}</p>}
        <button className="scan-button" onClick={handleNextButtonClick} disabled={!fingerprintImage || !voterId}>
          VERIFY
        </button>
        <div ref={scannerRef}></div>
      </div>
    </div>
  );
};

export default FingerprintScanner;
