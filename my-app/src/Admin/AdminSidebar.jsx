import React, { useState } from 'react';
import './AdminSidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaStore, FaBoxOpen, FaUserPlus, FaCog,  FaTachometerAlt } from 'react-icons/fa';
const AdminSidebar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  return (
    <div className="side-bar">
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
           <Link to={"/admindash"} className="sidebar-link">
            <li
              className={activePage === '/admindash' ? 'active' : ''}
              onClick={() => setActivePage('/admindash')}
            >
              <FaTachometerAlt className="sidebar-icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to={'/users'} className="sidebar-link">
            <li
              className={activePage === '/users' ? 'active' : ''}
              onClick={() => setActivePage('/users')}
            >
              <FaUsers className="sidebar-icon" />
              <span>Total Users</span>
            </li>
          </Link>
          <Link to={'/sellers'} className="sidebar-link">
            <li
              className={activePage === '/sellers' ? 'active' : ''}
              onClick={() => setActivePage('/sellers')}
            >
              <FaStore className="sidebar-icon" />
              <span>Total Sellers</span>
            </li>
          </Link>
          <Link to={'/ProductView'} className="sidebar-link">
            <li
              className={activePage === '/ProductView' ? 'active' : ''}
              onClick={() => setActivePage('/ProductView')}
            >
              <FaBoxOpen className="sidebar-icon" />
              <span>Total Products</span>
            </li>
          </Link>
          <Link to={'/newregistration'} className="sidebar-link">
            <li
              className={activePage === '/newregistration' ? 'active' : ''}
              onClick={() => setActivePage('/newregistration')}
            >
              <FaUserPlus className="sidebar-icon" />
              <span>Registration</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>

  );
};
export default AdminSidebar;