import React, { useState } from 'react';
import axios from 'axios';
import './reg.css';

function Reg() {
  const [formData, setFormData] = useState({
    name: '',
    fName: '',
    caste: '',
    phone: '',
    address: '',
    msg: '',
    password: '',
    email:'',
    profile: null,
    bgImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('/user/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fName">Father's Name</label>
          <input type="text" id="fName" name="fName" value={formData.fName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="caste">Caste</label>
          <input type="text" id="caste" name="caste" value={formData.caste} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="msg">Message</label>
          <textarea id="msg" name="msg" rows="3" value={formData.msg} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="profile">Profile Picture</label>
          <input type="file" id="profile" name="profile" accept="image/*" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="bgImage">Background Image</label>
          <input type="file" id="bgImage" name="bgImage" accept="image/*" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export { Reg };
