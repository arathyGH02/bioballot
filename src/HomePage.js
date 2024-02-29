import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import Navbar from './Navbar';
const HomePage = () => {
    return(
        <div>
            <Navbar /> {/* Use the Navbar component */}
      {/* <div className='content'>
         Rest of the content 
      </div> */}

            <div className='content'>
                <div className='description'>
                    <h1>BioBallot</h1>
                    <h3>Welcome to BioBallot - Your Trusted Online Voting Platform.</h3>
                    <p>
                    
                    BioBallot creates a robust, secure, and user- friendly voting process that ensures
 each eligible voter can cast their vote while minimizing the risk of fraud
 or irregularities. Its a fingerprint and facial image recognition based voting website.
                    </p>
                </div>

                <div className='image'>
                    <img src='/images/bg.jpg' alt='BioBallot Image' />
                </div>

                <div className='buttons-section'>
          <button className='login-button'>
            <Link to="/voter-login">Voter Login</Link>
          </button>
          <button className='login-button'>
            <Link to="/admin-login">Admin Login</Link>
          </button>
        </div>

        <div className='create-account-link'>
          <p>
            Don't have an account? <Link to="/register">Create New Account</Link>
          </p>
        </div>
            </div>
        </div>
    );
}

export default HomePage;