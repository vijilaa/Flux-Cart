import React, { useEffect, useState } from 'react';
import './Navbar.css';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedin');
    setIsLoggedIn(storedLogin === 'true');
  }, []);


  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="change">
      <nav className="navbar navbar-expand-sm full_nav">
        <div className="container">
          <Link to="/" className="navbar-brand text-white mb-0" style={{ fontSize: "1.5rem" }}>
            <span className='span-mini'>MINI</span>
            <span className='span-zoo'>ZOO</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className="nav-link text-dark btn btn-link"
                  
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/User-about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Service">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/phone-contact">Contact</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-4">
              <button className="btn rounded-pill me-3">
                <FontAwesomeIcon icon={faHeart} className="me-2" />

              </button>
              <button className="btn rounded-pill" onClick={() => navigate("/vieworder")}>
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />

              </button>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar