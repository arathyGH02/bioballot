import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AddElection.css'; // Make sure this matches your actual CSS file name

const AddElection = () => {
  const history = useNavigate();

  const [electionData, setElectionData] = useState({
    name: '',
    date: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
    history('/add-candidate');
  };

  return (
    <div>
      <Navbar />
      <div className="add-election-container">
        <h2 className="add-election-title">Add New Election</h2>
        <form className="add-election-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name of Election:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={electionData.name}
            onChange={handleInputChange}
          />

          <label htmlFor="date">Date of Election:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={electionData.date}
            onChange={handleInputChange}
          />

          <label htmlFor="type">Type of Election:</label>
          <select
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
            <label htmlFor="constituency">Constituency:</label>
          ) : (
            <label htmlFor="wardNumber">Ward Number:</label>
          )}
          {electionData.type === 'state-assembly' || electionData.type === 'lok-sabha' ? (
            <input
              type="text"
              id="constituency"
              name="constituency"
              value={electionData.constituency}
              onChange={handleInputChange}
            />
          ) : electionData.type === 'local' ? (
            <>
              <label htmlFor="panchayat">Panchayat:</label>
              <input
                type="text"
                id="panchayat"
                name="panchayat"
                required="false"
                value={electionData.panchayat}
                onChange={handleInputChange}
              />
              <label htmlFor="municipality">Municipality:</label>
              <input
                type="text"
                id="municipality"
                name="municipality"
                required="false"
                value={electionData.municipality}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <input
              type="text"
              id="wardNumber"
              name="wardNumber"
              value={electionData.wardNumber}
              onChange={handleInputChange}
            />
          )}

          <button type="submit">Add Election</button>
        </form>
      </div>
    </div>
  );
};

export default AddElection;
