import React from 'react';
import Navbar from './Navbar';
import './AboutPage.css';
const AboutPage = () => {
  return (
    
    <div>
      
      <Navbar /> {/* Use the Navbar component */}
      
      <div className='container'>
      <h2>About Us</h2>
      <p>
      Welcome to BioBallot, your trusted online voting platform. Below are guidelines and steps to follow: 
      </p>
      <br></br>
      
      <div className="heading">Registration Process:</div>
      <p className='paragraph'>
      <ol>
    <li><b><i>Accessing the Registration Page: </i></b>
        Navigate to the website and click on the "Register" or "New Voter Registration" link.</li>
    <li><b><i>Providing Personal Details: </i></b>
    Fill in the required personal details, including your Aadhaar number, name, address, etc.</li>
    <li><b><i>Uploading Fingerprint Image: </i></b>
    Capture your fingerprint image using a supported device or upload a pre-captured fingerprint image.</li>
    <li><b><i>Uploading Facial Image: </i></b>
    Capture your facial image using a supported device or upload a pre-captured facial image.</li>
    <li><b><i>Submission and Verification: </i></b>
    Submit the registration form for verification.
    Once verified, you will receive a confirmation email with your username and password. </li>
</ol>
</p>

      <br></br>

      <div className="heading">Voting Process:</div>
      <p className='paragraph'>
      <ol>
    <li><b><i>Logging In: </i></b>

    On the day of voting, visit the website and click on the "Login" or "Voter Login" link.
    Enter your username and password.</li>
    <li><b><i>Fingerprint and Facial Verification: </i></b>
    Capture your fingerprint and facial image for verification purposes.
    Wait for the system to verify your identity.</li>
    <li><b><i>Voting Page: </i></b>
    Upon successful verification, you will be redirected to the voting page.</li>
    <li><b><i>Casting Your Vote: </i></b>
    View the list of candidates and select your preferred candidate for each position.
    Confirm your selections and cast your vote.</li>
    <li><b><i>Logout: </i></b>
    After casting your vote, click on the "Logout" button to exit the voting system. </li>
</ol>
</p>
<br></br>

<div className="heading">Guidelines</div>
<p className='paragraph'>

<ol>
<li><b><i>Secure Your Credentials: </i></b>

Keep your username and password confidential. Do not share them with anyone.</li>
<li><b><i>Use a Secure Connection: </i></b>

Ensure that you are using a secure and trusted internet connection when accessing the website.</li>
<li><b><i>Capture High-Quality Images: </i></b>

When capturing fingerprint and facial images during registration and voting, ensure good lighting and focus for accurate verification.</li>
<li><b><i>Follow System Instructions: </i></b>

Pay attention to on-screen instructions during the registration and voting processes to ensure a smooth experience.</li>
<li><b><i>Contact Support for Assistance: </i></b>

If you encounter any issues or need assistance, contact the support team through the provided channels.</li>
<li><b><i>Vote Responsibly: </i></b>

Make informed decisions when selecting candidates. Your vote matters!</li>
<li><b><i>Logout After Voting: </i></b>

Always logout after completing the voting process to secure your account.</li> 
</ol>
</p>

  </div>
</div>
  );
}

export default AboutPage;