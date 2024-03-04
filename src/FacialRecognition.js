import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './FacialRecognition.css'; // Create a CSS file for styling

const FacialRecognition = () => {
  const navigate = useNavigate();
  const [facialImage, setFacialImage] = useState(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    let captureTimeout;

    if (capturing) {
      // Simulate capturing facial image for a few seconds
      captureTimeout = setTimeout(() => {
        setCapturing(false);
        setFacialImage(captureFacialImage());
      }, 3000); // Adjust the timeout duration as needed
    }

    return () => clearTimeout(captureTimeout);
  }, [capturing]);

  const handleCaptureFacialImage = () => {
    setCapturing(true);
  };

  const captureFacialImage = () => {
    // Placeholder function to simulate capturing the facial image
    return "https://via.placeholder.com/300"; // Placeholder image URL
  };

  const handleNextButtonClick = () => {
    navigate('/election-page'); // Update to the actual path of your ElectionPage
  };

  return (
    <div>
      <Navbar />
      <div className="facial-recognition-container">
        <h2 className="recognition-title">Facial Recognition</h2>
        <p className="recognition-message">{capturing ? "Capturing facial image..." : facialImage ? "Facial image captured!" : "Capture your facial image for verification"}</p>
        {facialImage && <img src={facialImage} alt="Facial Recognition" className="facial-image" />}
        <button className={`capture-button ${capturing ? 'capturing' : facialImage ? 'captured' : ''}`} onClick={handleCaptureFacialImage} disabled={capturing || facialImage}>
          {capturing ? "Capturing..." : facialImage ? "Facial Image Captured" : "Capture Facial Image"}
        </button>
        <br />
        <button className={`next-button ${facialImage ? 'captured' : ''}`} onClick={handleNextButtonClick} disabled={!facialImage}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default FacialRecognition;
