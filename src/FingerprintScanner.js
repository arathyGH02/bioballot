import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import './FingerprintScanner.css';

const FingerprintScanner = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [fingerprintImage, setFingerprintImage] = useState(null);

  const handleScan = () => {
    setScanning(true);
    const capturedImage = captureFingerprintImage();
    console.log("Fingerprint image captured:", capturedImage);
    // Simulating delay for scanning
    setTimeout(() => {
      setScanning(false);
      setFingerprintImage(capturedImage);
    }, 2000);
  };

  const captureFingerprintImage = () => {
    return "https://via.placeholder.com/300";
  };

  const handleNextButtonClick = () => {
    // Navigate to FacialRecognition.js when the "NEXT" button is clicked
    navigate('/facial-recognition');
  };

  return (
    <div>
      <Navbar />
      <div className="fingerprint-scanner-container">
        <h2 className="scanner-title">Fingerprint Scanner</h2>
        <p className="scanner-message">{scanning ? "Please place your finger on the sensor..." : "Scan your fingerprint"}</p>
        {fingerprintImage && <img src={fingerprintImage} alt="Fingerprint" className="fingerprint-image" />}
        <button className={`scan-button ${scanning ? 'scanning' : ''}`} onClick={handleScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Scan Fingerprint"}
        </button>
        <br></br>
        <button className={`scan-button ${scanning ? 'scanning' : ''}`} onClick={handleNextButtonClick}>
          NEXT
        </button>
        <div ref={scannerRef}></div>
      </div>
    </div>
  );
};

export default FingerprintScanner;
