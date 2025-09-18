import React, { useState } from 'react';
import "./Signup.css";
import { FaRegUserCircle, FaPhoneSquareAlt, FaLock } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    repeatpassword: "",
    image: null,

  });
  const [preview, setImagePreview] = useState("");


  const [error, setError] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  let filteredValue = value;

  // Input restrictions by field
  if (name === "name") {
    // Only letters and spaces
    filteredValue = value.replace(/[^A-Za-z\s]/g, '');
  }

  if (name === "number") {
    filteredValue = value.replace(/[^0-9]/g, '');
  }

  // You can add other fields if needed, like restricting password characters, etc.
  
  setFormData({
    ...formData,
    [name]: filteredValue,
  });
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
    let formError = {
      name: "",
      number: "",
      email: "",
      password: "",
      repeatpassword: ""
    };
    let isValid = true;

    const isAllEmpty = Object.values(formData).every((val) => val.trim() === "");
    if (isAllEmpty) {
      for (let field in formError) {
        formError[field] = "This field is required";
      }
      setError(formError);
      return false;
    }

    if (!formData.name.trim()) {
      formError.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      formError.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formError.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.number.trim()) {
      formError.number = "Phone number is required";
      isValid = false;
    } else if (formData.number.length < 10) {
      formError.number = "Phone number must be at least 10 digits";
      isValid = false;
    }

    if (!formData.password) {
      formError.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      formError.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.repeatpassword) {
      formError.repeatpassword = "Repeat password is required";
      isValid = false;
    } else if (formData.repeatpassword.length < 6) {
      formError.repeatpassword = "Repeat password must be at least 6 characters";
      isValid = false;
    } else if (formData.password !== formData.repeatpassword) {
      formError.repeatpassword = "Passwords do not match";
      isValid = false;
    }

    setError(formError);
    return isValid;
  };
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append( 'number',formData.number);
     data.append('email',formData.email) ;          
     data.append('password', formData.password)
    data.append( 'repeatpassword',formData.repeatpassword);
 if (formData.image) {
      data.append('image', formData.image);
    }



    if (!validateForm()) {
      return;
    }
 axios.post("http://localhost:5000/userregister", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {

        console.log(result);
        alert("Success");
        navigate("/log")
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again.");
      });

  }



  return (
    <div className="user-signup-page">
      <div className="user-signup-bg-img">
        <div className="user-signup-box">
          <div className='user-signup-blur-bg'></div>
          <h4 className="user-signup-h4 mt-3">SIGNUP</h4>
          <div className="image-upload-group">
     
            <img src={preview || "https://via.placeholder.com/160"} alt="" />
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

          <form onSubmit={handleSubmit} className="user-signup-form mt-4 mb-5">
            <div className="user-signup-logo-and-input">
              <div className="user-signup-icons"><FaRegUserCircle /></div>
              <input
                placeholder="Enter your name"
                className="user-signup-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {error.name && <div className="error-msg">{error.name}</div>}

            <div className="user-signup-logo-and-input">
              <div className="user-signup-icons"><MdOutlineMail /></div>
              <input
                placeholder="Enter your email"
                className="user-signup-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {error.email && <div className="error-msg">{error.email}</div>}

            <div className="user-signup-logo-and-input">
              <div className="user-signup-icons"><FaPhoneSquareAlt /></div>
              <input
                placeholder="Enter your number"
                className="user-signup-input"
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
            {error.number && <div className="error-msg">{error.number}</div>}

            <div className="user-signup-logo-and-input">
              <div className="user-signup-icons"><FaLock /></div>
              <input
                placeholder="Enter a new password"
                className="user-signup-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error.password && <div className="error-msg">{error.password}</div>}

            <div className="user-signup-logo-and-input">
              <div className="user-signup-icons"><FaLock /></div>
              <input
                placeholder="Repeat password"
                className="user-signup-input"
                type="password"
                name="repeatpassword"
                value={formData.repeatpassword}
                onChange={handleChange}
              />
            </div>
            {error.repeatpassword && <div className="error-msg">{error.repeatpassword}</div>}

            <div className="checkbox-div">
              <input type="checkbox" id="agreeTerms" required />
              <label className="signup-agree" htmlFor="agreeTerms">
                I agree to the{' '}
                <Link to="" className="signup-link-a">Terms of Condition</Link>
              </label>
            </div>

            <button className="user-signupBtn" type="submit" >
              SIGN UP
              <span className="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(183, 128, 255)">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
