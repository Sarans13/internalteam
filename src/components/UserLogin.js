import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to fetch user data based on the provided ID
      const response = await axios.get(`http://localhost:5000/getUser/${formData.id}`);
      const userData = response.data;
      if (userData && userData.password === formData.password) {
        console.log(userData);
        alert("login succesful")
        setLoggedIn(true); 
        // Redirect or perform actions for successful login
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loggedIn && (
        <Link to="/DataDisplay">Continue to Data Display</Link>
      )}
    </div>
  );
};

export default Login;
