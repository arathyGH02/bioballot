

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Admin.css';

const Admin = () => {
  // Placeholder data (replace with actual data fetching logic)
 
  return (

    <div> <Navbar />

    <div className="admin-dashboard">
    <Link to="/voter-list" className="admin-link">
      <div className="admin-box" onClick={() => console.log('Fetching Registered Voters')}>
        <h3>Registered Voters</h3>
        
      </div>
      </Link>

      <Link to="/candidate-list" className="admin-link">
      <div className="admin-box" onClick={() => console.log('Fetching Candidate Details')}>
        <h3>Candidate Details</h3>
        
      </div>
      </Link>

      <Link to="/add-candidate" className="admin-link">
        <div className="admin-box">
          <h3>Add Candidate Details</h3>
        </div>
      </Link>

      <Link to="/add-election" className="admin-link">
        <div className="admin-box">
          <h3>Add Election</h3>
        </div>
      </Link>

      {/* Add more boxes as needed */}

    </div>
    </div>
  );
};

export default Admin;
