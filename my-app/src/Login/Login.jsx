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
                    type="text"
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
              <div className="user-login-socials-container">
                <a href="#" className="user-login-social twitter">
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
                <a href="#" className="user-login-social facebook">
                  <svg height="1em" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
                <a href="#" className="user-login-social google-plus">
                  <svg height="1em" viewBox="0 0 640 512">
                    <path d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"></path>
                  </svg>
                </a>
              </div>
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

