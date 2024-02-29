import React, { useRef, useState } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import './FingerprintScanner.css';

const FingerprintScanner = () => {
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
    // Placeholder function to simulate capturing the fingerprint image
    // In a real integration, this function would capture the actual fingerprint image
    // Here, we'll just return a placeholder image URL
    return "https://via.placeholder.com/300"; // Increased size to 300x300 pixels
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="fingerprint-scanner-container">
        <h2 className="scanner-title">Fingerprint Scanner</h2>
        <p className="scanner-message">{scanning ? "Please place your finger on the sensor..." : "Scan your fingerprint"}</p>
        {fingerprintImage && <img src={fingerprintImage} alt="Fingerprint" className="fingerprint-image" />}
        <button className={`scan-button ${scanning ? 'scanning' : ''}`} onClick={handleScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Scan Fingerprint"}
        </button>
        <br></br>
        <button className={`scan-button ${scanning ? 'scanning' : ''}`}>NEXT</button>
        <div ref={scannerRef}></div>
      </div>
    </div>
  );
};

export default FingerprintScanner;
