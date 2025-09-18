import React, { useState } from 'react';
import './Admin.css'; // This will be our new CSS file
import { MdOutlineMail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminPhoto from '../assets/admin.jpg'

function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let adminemail = "vijila331@gmail.com"
  let AdminPassword = "helloitsme"
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format.');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required.');
      return false;
    } else if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (formData.email === adminemail && formData.password === AdminPassword) {
      navigate('/adminDash');
    }
    else {
      alert("invalid email or password")
    }
    setLoading(true);
     console.log('Admin login successful:');
 };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-left">
          <img
            src={AdminPhoto}
            alt="Admin Login Illustration"
          />
        </div>

        <div className="admin-login-right">
          <form onSubmit={handleSubmit} className="admin-login-form">
            <h2>Admin Login</h2>

            <div className="form-col">
              <div className="form-field">
                <MdOutlineMail />
                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;