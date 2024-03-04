// AddElection.js
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
    history('/admin');
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
            <label className="input-label" htmlFor="constituency">
              Constituency:
            </label>
          ) : (
            <label className="input-label" htmlFor="wardNumber">
              Ward Number:
            </label>
          )}
          {electionData.type === 'state-assembly' || electionData.type === 'lok-sabha' ? (
            <input
              className="input-field"
              type="text"
              id="constituency"
              name="constituency"
              value={electionData.constituency}
              onChange={handleInputChange}
            />
          ) : electionData.type === 'local' ? (
            <>
              <label className="input-label" htmlFor="panchayat">
                Panchayat:
              </label>
              <input
                className="input-field"
                type="text"
                id="panchayat"
                name="panchayat"
                required="false"
                value={electionData.panchayat}
                onChange={handleInputChange}
              />
              <label className="input-label" htmlFor="municipality">
                Municipality:
              </label>
              <input
                className="input-field"
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
              className="input-field"
              type="text"
              id="wardNumber"
              name="wardNumber"
              value={electionData.wardNumber}
              onChange={handleInputChange}
            />
          )}

          <button className="submit-button" type="submit">
            Add Election
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddElection;
