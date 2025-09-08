// import React, { useState, useEffect } from 'react';
// import './For.css';
// import { useNavigate } from 'react-router-dom';

// const For= () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     repeatpassword: ''
//   });

//   const [error, setError] = useState({});
//   const [storedEmail, setStoredEmail] = useState('');

//   useEffect(() => {
//     const savedEmail = localStorage.getItem('email');
//     if (savedEmail) {
//       setStoredEmail(savedEmail);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//       isValid = false;
//     } else if (formData.email !== storedEmail) {
//       newErrors.email = 'Email does not match any existing account';
//       isValid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       isValid = false;
//     }

//     if (!formData.repeatpassword) {
//       newErrors.repeatpassword = 'Repeat password is required';
//       isValid = false;
//     } else if (formData.password !== formData.repeatpassword) {
//       newErrors.repeatpassword = 'Passwords do not match';
//       isValid = false;
//     }

//     setError(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       localStorage.setItem('password', formData.password);
//       alert('Password updated successfully!');
//       navigate('/log');
//       setFormData({ email: '', password: '', repeatpassword: '' });
//       setError({});
//     }
//   };

//   return (
//     <div className="forgot-page">
//       <div className="forgot-container">
//         <form onSubmit={handleSubmit} className="forgot-form">
//           <h2 className="forgot-title">Reset Password</h2>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="forgot-input"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {error.email && <p className="forgot-error">{error.email}</p>}

//           <input
//             type="password"
//             name="password"
//             placeholder="New Password"
//             className="forgot-input"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {error.password && <p className="forgot-error">{error.password}</p>}

//           <input
//             type="password"
//             name="repeatpassword"
//             placeholder="Repeat Password"
//             className="forgot-input"
//             value={formData.repeatpassword}
//             onChange={handleChange}
//           />
//           {error.repeatpassword && <p className="forgot-error">{error.repeatpassword}</p>}

//           <button type="submit" className="forgot-button">
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default For;






import React, { useState, useEffect, } from 'react';
import "./For.css";
import { useNavigate } from 'react-router-dom';

const For = () => {
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

export default For;
