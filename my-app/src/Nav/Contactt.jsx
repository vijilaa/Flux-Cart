import React, { useState } from 'react';
import './Contactt.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
const Contactt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) {
          return 'Name is required';
        }
        break;
      case 'email':
        if (!value) {
          return 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Email is invalid';
        }
        break;
      case 'subject':
        if (!value) {
          return 'Subject is required';
        }
        break;
      case 'message':
        if (!value) {
          return 'Message is required';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validate(name, value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  axios.post("http://localhost:5000/addcontact",formData)
    .then((result) => {
      console.log(result);
      
    
    })
    .catch((error) => {
      console.log(error);
    });
    alert("Blog Added Successfully!");
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>If you have any questions or need assistance, feel free to reach out to us.</p>
          <div className="contact-details">
            <p><FaPhone className="icon" /> +1 (555) 123-4567</p>
            <p><FaEnvelope className="icon" /> support@shopease.com</p>
            <p><FaMapMarkerAlt className="icon" /> 123 Market Street, New York, NY</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h3>Send a Message</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          {errors.subject && <p className="error">{errors.subject}</p>}

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contactt;