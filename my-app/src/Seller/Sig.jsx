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
    dob: '', gender: '', shopName: '', gstNumber: '', businessAddress: '', image: null,
  });
  const [preview, setImagePreview] = useState("");
  const [error, setError] = useState({});

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Input restrictions by field
    if (name === "name" || name === "shopName") {
      // Allow only letters and spaces
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === "number") {
      // Allow only digits and limit to 10 characters
      filteredValue = value.replace(/[^0-9]/g, '');
      if (filteredValue.length > 10) {
        filteredValue = filteredValue.slice(0, 10);
      }
    } else if (name === "gstNumber") {
      // Convert to uppercase, allow alphanumeric only, and limit to 15 characters
      filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (filteredValue.length > 15) {
        filteredValue = filteredValue.slice(0, 15);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      setImagePreview(URL.createObjectURL(file));
    }
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

    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.number)) { // Exactly 10 digits
      newErrors.number = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // GST Number Validation (optional if not mandatory, but good to validate format and length)
    if (formData.gstNumber.trim()) { // Only validate if a GST number is entered
        if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
            newErrors.gstNumber = 'Invalid GST Number format (e.g., 27ABCDE1234F1Z5)';
            isValid = false;
        } else if (formData.gstNumber.length !== 15) {
            newErrors.gstNumber = 'GST Number must be exactly 15 characters';
            isValid = false;
        }
    }


    setError(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, errors are already set, so just return
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('number', formData.number);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('dob', formData.dob);
    data.append('gender', formData.gender); // Added gender, though not in form fields
    data.append('shopName', formData.shopName);
    data.append('gstNumber', formData.gstNumber);
    data.append('businessAddress', formData.businessAddress);
    if (formData.image) {
      data.append('image', formData.image);
    }

    axios.post("http://localhost:5000/sellerregister", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {
        if (result.data.msg === "successful") {
          console.log(result);
          alert("Success");
          navigate("/logo");
        } else {
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
              <div className="image-upload-group">
                {/* Display a placeholder if no image is selected */}
                <img src={preview || "https://via.placeholder.com/160"} alt="Profile Preview" />
                <label htmlFor="file-upload" className="custom-file-input">
                  Choose Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="form-col">
                <div className="form-field">
                  <FaRegUserCircle />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength="50" // Optional: max length for name
                  />
                </div>
                {error.name && <p className="error-text">{error.name}</p>}

                <div className="form-field">
                  <MdOutlineMail />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {error.email && <p className="error-text">{error.email}</p>}

                <div className="form-field">
                  <FaPhoneSquareAlt />
                  <input
                    type="tel"
                    name="number"
                    placeholder="Phone Number (10 digits)"
                    value={formData.number}
                    onChange={handleChange}
                    maxLength="10" // HTML max length
                    pattern="\d{10}" // HTML pattern for 10 digits
                    inputMode="numeric"
                  />
                </div>
                {error.number && <p className="error-text">{error.number}</p>}

                <div className="form-field">
                  <FaLock />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6" // HTML min length
                  />
                </div>
                {error.password && <p className="error-text">{error.password}</p>}
              </div>

              <div className="form-col">
                <div className="form-field">
                  <MdDateRange />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={getTodayDate()} // This is the key change!
                  />
                </div>

                <div className="form-field">
                  <FaStore />
                  <input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleChange}
                    maxLength="100" // Optional: max length for shop name
                  />
                </div>

                <div className="form-field">
                  <MdBadge />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="GST Number (15 alphanumeric)"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    maxLength="15" // HTML max length
                    pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" // Specific GST pattern
                    inputMode="text" // Keep as text as it's alphanumeric
                  />
                </div>
                {error.gstNumber && <p className="error-text">{error.gstNumber}</p>}

                <div className="form-field">
                  <FaBuilding />
                  <input
                    type="text"
                    name="businessAddress"
                    placeholder="Business Address"
                    value={formData.businessAddress}
                    onChange={handleChange}
                  />
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