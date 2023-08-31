import React, { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reenterPassword: '',
    organizationId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:5000'; 

    try {
      await axios.post(`${apiUrl}/signup`, formData);
      console.log('Making request to:', `${apiUrl}/signup`);
      setFormData({
        name: '',
        email: '',
        password: '',
        reenterPassword: '',
        organizationId: '',
      });
      alert('Signup successful');
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
        <div>
          <label htmlFor="reenterPassword">Reenter Password</label>
          <input
            type="password"
            id="reenterPassword"
            name="reenterPassword"
            value={formData.reenterPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="organizationId">Organization ID</label>
          <input
            type="text"
            id="organizationId"
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
