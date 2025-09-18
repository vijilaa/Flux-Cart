import React from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  function validateLogin() {
    const newErrors = {};

    const emailRegex = /\S+@\S+\.\S+/;
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    if (!validateLogin()) {
      return;
    }
    axios.post('http://localhost:5000/one', { email: loginData.email })
      .then((result) => {
        const user = result.data.data;
        localStorage.setItem("userLoginStatus",true)

console.log(user);


        if (!user) {
          alert("User not found. Please sign up first.");
          return;
        }
        if (user.password === loginData.password) {
          console.log(user);
          localStorage.setItem('UserId',user._id)
          
          alert("Login successful!");
          navigate("/home")
        }
        else {
          alert("Invalid email or password.");
        }
      })
      .catch ((error) => {
          console.log(error);

        });
  }
  return (
    <div>

      <div className='user-login-page'>
        <div className='user-login-bg-img'>
          <div className='user-login-box'>
            <div className='user-login-blur-background'></div>
            <div className="user-login-content">


              <div className='user-login-logo-container'>
                <img className='user-login-logo mt-1' src={"https://img.freepik.com/free-vector/flat-design-mobile-store-logo-template_23-2149728782.jpg?uid=R176304562&ga=GA1.1.1707953542.1732684197&semt=ais_hybrid&w=740"} alt='User Logo' />
              </div>
              <h4 className='user-login-h4 mt-3'>USER LOGIN</h4>

              <form className='user-login-form mt-2' onSubmit={handleLoginSubmit}>
                <div className='user-login-input'>
                  <input placeholder="Email"
                    className="form-control user-input"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required />
                  {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>
                <div className='user-login-input'>
                  <input placeholder="Password"
                    className="form-control user-input"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required />
                  {errors.password && <div className="error-msg">{errors.password}</div>}

                </div>
                <span className='user-login-checkbox-span'>
                  <div className='user-login-checkbox'>
                    <input type='checkbox'
                      id="remember-me" />
                    <p className='user-login-p'>Remember me</p>
                  </div>
                </span>
                <button className='user-login-btn' type="submit">LOGIN</button>
              </form>
              <Link to="/Forgot" className="user-login-forgetpass mt-1" style={{ textDecoration: "none" }}>
                Forgot password?
              </Link>
              <p className='user-login-p1 mt-3'>or login with</p>
              <div className='user-login-footer-p2 mt-2 mb-2'>
                <p>Don't have a account<span className='user-login-span'> <Link to="/Sign" className='user-login-registerhere'> Register here</Link></span> </p>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login

