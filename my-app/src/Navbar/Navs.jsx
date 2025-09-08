import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import adminImg from "../assets/Images/ecom-7.jpg";
import sellerImg from "../assets/Images/ecom-8.jpg";
import userImg from "../assets/Images/ecom-9.jpg";

function Navs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage on component mount
    const storedLogin = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLogin === 'true');

    // Listen for changes in localStorage to sync across tabs
    const handleStorageChange = () => {
      const updatedLoginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(updatedLoginStatus === 'true');
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };


  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-sm bg-white custom-navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span className='span-mini'>MINI</span>
            <span className='span-zoo'>ZOO</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
            aria-controls="mynavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                {isLoggedIn ? (
                  // If logged in, navigate directly to home
                  <button className="nav-link nav-btn" onClick={() => navigate('/home')}>
                    Home
                  </button>
                ) : (
                  // If not logged in, clicking this button opens the login prompt modal
                  <button
                    className="nav-link nav-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#loginPromptModal"
                  >
                    Home
                  </button>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/phone">Contact</Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {!isLoggedIn && (
                <FontAwesomeIcon
                  icon={faUser}
                  className="user-icon ms-3"
                  data-bs-toggle="modal"
                  data-bs-target="#userTypeModal"
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Login Prompt Modal --- */}
      <div className="modal fade" id="loginPromptModal" tabIndex="-1" aria-labelledby="loginPromptModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginPromptModalLabel">Authentication Required</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>Please log in or register to access the home page.</p>
              <div className="d-grid gap-2 col-8 mx-auto mt-4">
                <Link to="/log" className="btn btn-primary" onClick={() => closeModal('loginPromptModal')}>
                  Login
                </Link>
                <Link to="/sign" className="btn btn-secondary" onClick={() => closeModal('loginPromptModal')}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* --- User Type Selection Modal --- */}
      <div className="modal fade" id="userTypeModal" tabIndex="-1" aria-labelledby="userTypeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userTypeModalLabel">Choose Your Role</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body user-role-selection-modal">
              <div className="role-option admin-option">
                <img src={adminImg} alt="Admin" className="role-icon" />
                <Link to="/adminlg" className="role-button-link" onClick={() => closeModal('userTypeModal')}>
                  <button className="btn role-button admin-btn">Admin Login</button>
                </Link>
              </div>
              <div className="role-option seller-option">
                <img src={sellerImg} alt="Seller" className="role-icon" />
                <Link to="/logo" className="role-button-link" onClick={() => closeModal('userTypeModal')}>
                  <button className="btn role-button seller-btn">Seller Login</button>
                </Link>
              </div>
              <div className="role-option user-option">
                <img src={userImg} alt="User" className="role-icon" />
                <Link to="/log" className="role-button-link" onClick={() => closeModal('userTypeModal')}>
                  <button className="btn role-button user-btn">User Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navs;