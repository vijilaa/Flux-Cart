import React from 'react';
import './SellerDashboard.css'; // Make sure this is imported
import SellerSidebar from './SellerSidebar';
import Navbar from '../Nav/Navbar';

const SellerDashboard = () => {
  return (
    <div>
      {/* This new container will manage the layout */}
      <div className="seller-dashboard-container">
        <SellerSidebar />
        <div className="dashboard-content">
          <h1>Seller Dashboard</h1>

          {/* Cards container */}
          <div className="cards">
            <div className="card">
              <h3>Total Sales</h3>
              <p>$12,500</p>
            </div>
            <div className="card">
              <h3>Total Orders</h3>
              <p>320</p>
            </div>
            <div className="card">
              <h3>Products Listed</h3>
              <p>45</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>$9,300</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;