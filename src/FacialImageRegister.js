import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './FacialImageRegister.css'; // Create a CSS file for styling
import axios from 'axios';

const FacialRegister = () => {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState('');
  const [facialImage, setFacialImage] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let stream;

    if (capturing) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((str) => {
          stream = str;
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error('Error accessing camera:', error.message);
          setCapturing(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [capturing]);

  const handleCaptureFacialImage = () => {
    setCapturing(true);
  };

  const handleCaptureButtonClick = () => {
    setCapturing(true);
    const canvas = document.createElement('canvas');
    if (videoRef.current && videoRef.current.srcObject) { // Add null check for videoRef.current
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/jpeg');
      setFacialImage(imageUrl);
      // Stop the camera stream
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    // Set capturing to false after capturing the image
    setCapturing(false);
  };

  const handleNextButtonClick = async () => {
    // Send the facial image and voter ID to the backend and navigate to the next page
    if (facialImage && voterId) {
      try {
        await sendFacialImageToBackend(facialImage, voterId);
        navigate('/finger-register'); // Update to the actual path of your ElectionPage
      } catch (error) {
        setRegistrationStatus('Failed to register image');
        console.error('Failed to upload facial image:', error.message);
      }
    }
  };

  const sendFacialImageToBackend = async (image, voterId) => {
    const blob = await fetch(image).then((res) => res.blob()); // Convert data URL to Blob
    const formData = new FormData();
    formData.append('voterId', voterId);
    formData.append('facialImage', blob, 'facialImage.jpg'); // Use a proper filename for the image

    const response = await axios.post('http://localhost:5000/upload-facial-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response from backend:', response.data.message);
  };

  return (
    <div>
      <Navbar />
      <div className="facial-recognition-container">
        <h2 className="recognition-title">Facial Recognition</h2>
        <p className="recognition-message">{capturing ? "Capturing facial image..." : facialImage ? "Facial image captured!" : "Capture your facial image for verification"}</p>
        {facialImage && <img src={facialImage} alt="Facial Recognition" className="facial-image" />}
        {registrationStatus && <p>{registrationStatus}</p>}
        <video ref={videoRef} style={{ display: capturing ? 'block' : 'none' }} />

        {!facialImage && !capturing &&
          <button className="capture-button" onClick={handleCaptureFacialImage}>
            Capture Facial Image
          </button>
        }
        {capturing &&
          <button className="capture-button" onClick={handleCaptureButtonClick}>
            Capture Image
          </button>
        }

        <br />
        <label>
          Voter ID:
          <input className="label-field" type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
        </label>
        <br />
        <button className={`next-button ${facialImage ? 'captured' : ''}`} onClick={handleNextButtonClick} disabled={!facialImage || !voterId}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default FacialRegister;
