import React from 'react';
import './Admin.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Admin = () => {
  return (
    <div className="admin-login-page">
      <div className="input-box-div">
        <h5 className="admin-login-h5">Admin Login</h5>
        <form className="admin-login-form">
          <div className="form-group icon-input-group">
            <label htmlFor="email" className="admin-label">Email</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                placeholder="Enter your email"
                className="form-control admin-input"
                type="email"
              />
            </div>
          </div>

          <div className="form-group icon-input-group">
            <label htmlFor="password" className="admin-label">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="password"
                placeholder="Enter your password"
                className="form-control admin-input"
                type="password"
              />
            </div>
          </div>

          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
