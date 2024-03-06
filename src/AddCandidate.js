import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AddCandidate.css';
import Axios from 'axios';


const AddCandidate = () => {
  const history = useNavigate();
  const [candidateData, setCandidateData] = useState({
    name: '',
    party: '',
    constituency: '',
    wardnumber: '',
    electionid: ''
  });

  const [message, setMessage] = useState('');

  

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/add-candidate');
        setCandidateData(response.data);
       
      } catch (error) {
        console.error('Failed to fetch voters:', error.message);
      }
    };

    fetchCandidates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/add-candidate', candidateData);
      if (response.status === 200) {
        setMessage('Candidate added successfully!');
        setCandidateData({
          name: '',
          party: '',
          constituency: '',
          wardnumber: '',
          electionid: ''
        });
      }
      else if(response.status === 400){
        setMessage(response.data.message);
      }
       else {
        setMessage('Failed to add candidate. Please try again.');
      }
      history('/admin');
    } catch (error) {
      console.error('Error:', error);
      setMessage('No more candidates can be added.');
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="add-candidate-container">
        <h2 className="add-candidate-title">Add New Candidate</h2>
        <form className="add-candidate-form" onSubmit={handleSubmit}>
          <label className="add-candidate-label" htmlFor="name">Name</label>
          <input
            className="add-candidate-input"
            type="text"
            id="name"
            name="name"
            value={candidateData.name}
            onChange={handleInputChange}
            required
          />

          <label className="add-candidate-label" htmlFor="party">Party</label>
          <input
            className="add-candidate-input"
            type="text"
            id="party"
            name="party"
            value={candidateData.party}
            onChange={handleInputChange}
            required
          />

          <label className="add-candidate-label" htmlFor="constituency">Constituency</label>
          <input
            className="add-candidate-input"
            type="text"
            id="constituency"
            name="constituency"
            value={candidateData.constituency}
            onChange={handleInputChange}
          />

          <label className="add-candidate-label" htmlFor="wardnumber">Ward Number</label>
          <input
            className="add-candidate-input"
            type="text"
            id="wardnumber"
            name="wardnumber"
            value={candidateData.wardnumber}
            onChange={handleInputChange}
          />

          <label className="add-candidate-label" htmlFor="electionid">Election ID</label>
          <input
            className="add-candidate-input"
            type="text"
            id="electionid"
            name="electionid"
            value={candidateData.electionid}
            onChange={handleInputChange}
            required
          />
         

          <button className="add-candidate-button" type="submit">Add Candidate</button>
        </form>

        {message && <p className="add-candidate-message">{message}</p>}
      </div>
    </div>
  );
};

export default AddCandidate;
