// AddElection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Axios from 'axios';
import './AddElection.css'; // Make sure this matches your actual CSS file name

const AddElection = () => {
  const history = useNavigate();

  const [electionData, setElectionData] = useState({
    name: '',
    date: '',
    electionid: '',
    numofcandidate: '',
    type: '',
    constituency: '',
    wardNumber: '',
    panchayat: '',
    municipality: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:5000/add-election', electionData);
      history('/add-candidate');
    } catch (error) {
      console.error('Error adding election:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-election-container">
        <h2 className="add-election-title">Add New Election</h2>
        <form className="add-election-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="name">
            Name of Election:
          </label>
          <input
            className="input-field"
            type="text"
            id="name"
            name="name"
            value={electionData.name}
            onChange={handleInputChange}
          />

          <label className="input-label" htmlFor="date">
            Date of Election:
          </label>
          <input
            className="input-field"
            type="date"
            id="date"
            name="date"
            value={electionData.date}
            onChange={handleInputChange}
          />
          <label htmlFor="electionid">Election ID:</label>
          <input
            type="text"
            id="electionid"
            name="electionid"
            value={electionData.electionid}
            onChange={handleInputChange}
          />
        
         <label htmlFor="numofcandidate">Number of Candidates:</label>
          <input
            type="text"
            id="numofcandidate"
            name="numofcandidate"
            value={electionData.numofcandidate}
            onChange={handleInputChange}
          />

          <label className="input-label" htmlFor="type">
            Type of Election:
          </label>
          <select
            className="input-field"
            id="type"
            name="type"
            value={electionData.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="state-assembly">State Assembly Election</option>
            <option value="lok-sabha">Lok Sabha Election</option>
            <option value="local">Local Election</option>
          </select>

          {electionData.type === 'state-assembly' || electionData.type === 'lok-sabha' ? (
  <>
    <label htmlFor="constituency">Constituency:</label>
    <input
      type="text"
      id="constituency"
      name="constituency"
      value={electionData.constituency}
      onChange={handleInputChange}
    />
  </>
) : null}

{electionData.type === 'local' ? (
  <>
    <label htmlFor="panchayat">Panchayat:</label>
    <input
      type="text"
      id="panchayat"
      name="panchayat"
      value={electionData.panchayat}
      onChange={handleInputChange}
    />
    <label htmlFor="municipality">Municipality:</label>
    <input
      type="text"
      id="municipality"
      name="municipality"
      value={electionData.municipality}
      onChange={handleInputChange}
    />
    <label htmlFor="wardNumber">Ward Number:</label>
    <input
      type="text"
      id="wardNumber"
      name="wardNumber"
      value={electionData.wardNumber}
      onChange={handleInputChange}
    />
  </>
) : null}

<br></br>
<br></br>
          <button className="Button" type="submit">Add Election</button>
        </form>
      </div>
    </div>
  );
};

export default AddElection;
