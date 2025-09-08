

import React, { useState, useEffect, } from 'react';
import "./Forgot.css";
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatpassword: ''
  });

  const [formError, setFormError] = useState({});
  const [oldPassword, setOldPassword] = useState('');
 const navigate = useNavigate();

  // Load the existing password from localStorage when the component mounts
  useEffect(() => {
    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      setOldPassword(savedPassword);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.repeatpassword) {
      errors.repeatpassword = "Repeat password is required";
      isValid = false;
    } else if (formData.repeatpassword !== formData.password) {
      errors.repeatpassword = "Passwords do not match";
      isValid = false;
    }

    setFormError(errors);

    if (isValid) {
      // Replace old password with the new confirmed password
      localStorage.setItem('password', formData.repeatpassword);

      alert("Password has been updated successfully!");
      navigate("/log")
      // Clear the form
      setFormData({
        email: '',
        password: '',
        repeatpassword: ''
      });
    }
  };

  return (
    <div>
      <div className="container-fluid forgot-page">

        <form onSubmit={handleSubmit}>

          <div className="user-form">
            <h1 className='Text-input'>Forgot!</h1>
            <input
              type="email"
              className="form-control input-line"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="form-control input-line mt-3"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formError.password && <p className="error">{formError.password}</p>}
            <input
              type="password"
              className="form-control input-line mt-3"
              placeholder="Repeat Password"
              name="repeatpassword"
              value={formData.repeatpassword}
              onChange={handleChange}
            />
            {formError.repeatpassword && <p className="error">{formError.repeatpassword}</p>}
            <button className="btn btn-outline-dark mt-3" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
