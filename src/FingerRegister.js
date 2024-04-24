import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import './FingerRegister.css';
import { discoverDevice, getDeviceInfo, captureBiometric } from './MantraRDService'; // Import the MantraRDService module

const FingerRegister = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [fingerprintImage, setFingerprintImage] = useState(null);

  const handleScan = async () => {
    setScanning(true);
    const capturedImage = await captureFingerprintImage();
    // Simulating delay for scanning
    setTimeout(() => {
      setScanning(false);
      setFingerprintImage(capturedImage);
    }, 2000);
  };
  

 const captureFingerprintImage = async () => {
  try {
    const { port, path } = await discoverDevice(); // Discover the device to get the port and path
    const capturedImage = await captureBiometric(port, path); // Pass the port and path to the captureBiometric function
    console.log("Fingerprint image captured:", capturedImage);
    return capturedImage;
  } catch (error) {
    console.error('Failed to capture fingerprint image:', error.message);
    return null;
  }
};

  

  const handleNextButtonClick = async () => {
    // Assuming 'capturedFingerprintData' is the data you want to store in the database
    const capturedFingerprintData = "captured_fingerprint_data_here";

    // Send a POST request to your backend API to store the captured fingerprint data
    try {
      const response = await fetch('http://localhost:5000/api/fingerprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fingerprintData: capturedFingerprintData })
      });
      if (response.ok) {
        console.log('Fingerprint data stored successfully');
        // Navigate to the next page after storing the fingerprint data
        navigate('/');
      } else {
        console.error('Failed to store fingerprint data');
      }
    } catch (error) {
      console.error('Error storing fingerprint data:', error);
    }
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

export default FingerRegister;

