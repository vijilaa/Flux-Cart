import React from 'react';
import './Navbar.css';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Ensure faUserCircle is imported

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    navigate('/');
  };

  return (
    <div className="change">
      <nav className="navbar navbar-expand-sm full_nav">
        <div className="container">
          <Link to="/" className="navbar-brand text-white mb-0" style={{ fontSize: "1.5rem" }}>
            <span className='span-mini'>FLUX</span>
            <span className='span-zoo'>CART</span>
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
                <Link to='/home' className="nav-link text-dark">Home</Link>
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

                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/Buydetails">Orders</Link>
                </li>

            </ul>
            <div className="d-flex align-items-center ms-4">
              <Link to={`/profile`}>
              <button className="btn rounded-pill me-3 icon-btn"> {/* Added a common class for icon buttons */}
                <FontAwesomeIcon icon={faUserCircle} size="lg" /> {/* Changed to faUserCircle */}
              </button>
              </Link>
              <button className="btn rounded-pill icon-btn" onClick={() => navigate("/vieworder")}> {/* Added common class */}
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </button>


                <button
                  className="btn rounded-pill ms-3 logout-btn"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                </button>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;