
import React, { useState } from 'react';
import './SellerSidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaBoxOpen, FaClipboardList } from 'react-icons/fa';

const SellerSidebar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  return (
    <div className="side-bar">
      <div className="sidebar">
        <h2 className="sidebar-title">Seller Panel</h2>
        <ul>
          <Link to={'/Dashboard'} className="sidebar-link">
            <li
              className={activePage === '/Dashboard' ? 'active' : ''}
              onClick={() => setActivePage('/Dashboard')}
            >
              <FaTachometerAlt className="sidebar-icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to={'/add'} className="sidebar-link">
            <li
              className={activePage === '/add' ? 'active' : ''}
              onClick={() => setActivePage('/add')}
            >
              <FaPlus className="sidebar-icon" />
              <span>Add Product</span>
            </li>
          </Link>
          <Link to={'/view'} className="sidebar-link">
            <li
              className={activePage === '/view' ? 'active' : ''}
              onClick={() => setActivePage('/view')}
            >
              <FaBoxOpen className="sidebar-icon" />
              <span>View Product</span>
            </li>
          </Link>
          <Link to={'/order'} className="sidebar-link">
            <li
              className={activePage === '/order' ? 'active' : ''}
              onClick={() => setActivePage('/order')}
            >
              <FaClipboardList className="sidebar-icon" />
              <span>Orders</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SellerSidebar;