import React, { useState } from 'react';
import '../style/toggle.css';
import Login from './UserLogin';
import Signup from './UserSignup';

const TeamsPortal = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
    <div className="App">
      <h1>Welcome to Portal</h1>
      <div className="form-container">
        <div className="toggle-container">
          <button onClick={toggleForm}>
            {showLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </div>
        <div className="form">
          {showLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div></>
  );
};

export default TeamsPortal;
