import React, { useState, useEffect } from 'react';
import '../style/card.css'; // Import your CSS file
import VoterFormModal from './ModalForm';

const DataDisplay = () => {
  const [fetchedData2019, setFetchedData2019] = useState([]);
  const [fetchedData2018, setFetchedData2018] = useState([]);
  const [fetchedVotersData, setFetchedVotersData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDataFromCollection = async (collectionName, setDataFunction) => {
    try {
      const response = await fetch(`http://localhost:5000/${collectionName}`);
      const jsonData = await response.json();
      setDataFunction(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromCollection('polling-booth-2019', setFetchedData2019);
    fetchDataFromCollection('polling-booth-2018', setFetchedData2018);
    fetchDataFromCollection('voters', setFetchedVotersData);
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/voters/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Update the state to reflect the deleted item
        setFetchedVotersData((prevData) => prevData.filter(item => item._id !== id));
      } else {
        console.error('Error deleting data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='hello'>
      <div className="section">
        <h1>Polling Booth 2019 Data</h1>
        <div className="card-container">
          {fetchedData2019.map((item, index) => (
            <div className="card" key={index}>
              <p>Polling Booth Number: {item['Polling Booth Number']}</p>
              <p>Polling Booth Name: {item['Polling Booth Name']}</p>
              <p>Winner 2019: {item['Winner- 2019']}</p>
              <p>Margin Percentage: {item['Margin %']}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h1>Polling Booth 2018 Data</h1>
        <div className="card-container">
          {fetchedData2018.map((item, index) => (
            <div className="card" key={index}>
              <p>Polling Booth Number: {item['Polling Booth Number']}</p>
              <p>Polling Booth Name: {item['Polling Booth Name']}</p>
              <p>Winner 2014: {item['Winner- 2014']}</p>
              <p>Margin Percentage: {item['Margin']}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h1>Voters Data</h1>
        <button onClick={openModal}>Add New Voter</button>
        <div className="card-container">
          {fetchedVotersData.map((item, index) => (
            <div className="card" key={index}>
              <p>Name: {`${item.first_name} ${item.middle_name} ${item.last_name}`}</p>
              <p>Age: {item.age}</p>
              <p>State: {item.state}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <VoterFormModal onClose={closeModal} />}
    </div>
  );
};

export default DataDisplay;
