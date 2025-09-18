import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Log.css';
import axios from 'axios'

function Log() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

   axios.post('http://localhost:5000/foneseller', loginData)
  .then((result) => {
    const seller = result.data.data;
    
    if (!seller) {
      alert("User not found. Please sign up first.");
      return;
    }

    if (loginData.password !== seller.password) {
      alert("Invalid email or password.");
      return;
    }

    if (!seller.AdminStatus) {
      alert("Your registration is pending approval by the admin.");
      return;
    }


    localStorage.setItem('SellerId', seller._id);
    alert("Login successful!");
    navigate("/dashboard");
  })
  .catch((error) => {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  });

  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-form-section">
          <h2 className="form-title">Login</h2>
          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="form-input"
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="form-input"
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>
            <div className="form-footer">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/For" className="link-forgot">Forgot password?</Link>
            </div>

            <button type="submit" className="form-button" onClick={handleLoginSubmit}>Login</button>

            <p className="register-link">
              Don't have an account? <Link to="/Sig">Register here</Link>
            </p>
          </form>
        </div>
        <div className="login-info-section">
          <div className="info-content">

            {/* <div className="info-overlay">
      <h3>Welcome Back to MiniZoo!</h3>
      <p>Access your personalized dashboard and manage your account with ease</p>
    </div> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Log;
