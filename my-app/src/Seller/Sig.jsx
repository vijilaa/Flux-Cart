import React, { useState } from 'react';
import './Sig.css';
import { FaRegUserCircle, FaPhoneSquareAlt, FaLock, FaBuilding, FaStore } from 'react-icons/fa';
import { MdOutlineMail, MdDateRange, MdWc, MdBadge } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sig() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', number: '', email: '', password: '',
    dob: '', gender: '', shopName: '', gstNumber: '', businessAddress: '',
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.number.trim() || formData.number.length < 10) {
      newErrors.number = 'Phone number must be at least 10 digits';
      isValid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
      if (!validateForm()) {
    return;
  }
    axios.post("http://localhost:5000/sellerregister", formData)
      .then((result) => {
        
  if (result.data.msg === "successful"){
        console.log(result);
        alert("Success");
        navigate("/logo")
  }else{
        alert(result.data.msg || "Something went wrong. Please try again.");
  }
      })
      .catch((error) => {
        console.log(error);
         alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="sig-container">
      <div className="sig-card">
        <div className="sig-left">
          <img
            src="https://img.freepik.com/premium-vector/sign-up-concept-illustration_251005-453.jpg"
            alt="Signup Illustration"
          />
        </div>

        <div className="sig-right">
          <form onSubmit={handleSubmit} className="sig-form">
            <h2>Seller Registration</h2>
            <div className="form-grid">
              <div className="form-col">
                <div className="form-field">
                  <FaRegUserCircle />
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                </div>
                {error.name && <p className="error-text">{error.name}</p>}

                <div className="form-field">
                  <MdOutlineMail />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                {error.email && <p className="error-text">{error.email}</p>}

                <div className="form-field">
                  <FaPhoneSquareAlt />
                  <input type="tel" name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} />
                </div>
                {error.number && <p className="error-text">{error.number}</p>}

                <div className="form-field">
                  <FaLock />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                {error.password && <p className="error-text">{error.password}</p>}
              </div>

              <div className="form-col">
                <div className="form-field">
                  <MdDateRange />
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div className="form-field">
                  <FaStore />
                  <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} />
                </div>

                <div className="form-field">
                  <MdBadge />
                  <input type="text" name="gstNumber" placeholder="GST Number" value={formData.gstNumber} onChange={handleChange} />
                </div>

                <div className="form-field">
                  <FaBuilding />
                  <input type="text" name="businessAddress" placeholder="Business Address" value={formData.businessAddress} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-agreement">
              <input type="checkbox" required />
              <label>I agree to the <a href="/">Terms and Conditions</a></label>
            </div>

            <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sig;
