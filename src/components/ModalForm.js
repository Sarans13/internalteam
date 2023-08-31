import React, { useState } from 'react';
import '../style/modal.css'; // Import your CSS file
import axios from 'axios';

const VoterFormModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [voterId, setVoterId] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    const apiUrl = 'http://localhost:5000';
    const formData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        age: age,
        voter_id: voterId,
        state: state,
        district: district,
      }; 
      alert('Voter Added');
    // Perform data submission logic here
    // try {
    //     await axios.post(`${apiUrl}/addvoters`, formData);
    //     console.log('Making request to:', `${apiUrl}/addvoters`);
    //     alert('Voter Added');
    //   } catch (error) {
    //     console.error(error);
    //     alert('Voter failed');
    //   }

    // Clear form fields
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setAge('');
    setVoterId('');
    setState('');
    setDistrict('');

    // Close the modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Voter</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Middle Name:
            <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <label>
            Voter ID:
            <input type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
          </label>
          <label>
            State:
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          </label>
          <label>
            District:
            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </label>
          <button type="submit">Add Voter</button>
        </form>
      </div>
    </div>
  );
};

export default VoterFormModal;
