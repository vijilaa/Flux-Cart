import React from 'react';
import './AdminDashboard.css'; // We will create this simple CSS file next
import { FaBoxOpen, FaUsers, FaStore, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      
      <p className="dashboard-subheader">
        Welcome! Here is a summary of your application's status.
      </p>

      {/* Grid container for the stat cards */}
      <div className="dashboard-grid">
        
        {/* Card 1: Total Products */}
        <div className="dashboard-card">
          <div className="card-icon products">
            <FaBoxOpen />
          </div>
          <div className="card-info">
            <p className="card-title">Total Products</p>
            <h3 className="card-value">1,250</h3>
          </div>
        </div>

        {/* Card 2: Total Users */}
        <div className="dashboard-card">
          <div className="card-icon users">
            <FaUsers />
          </div>
          <div className="card-info">
            <p className="card-title">Total Users</p>
            <h3 className="card-value">340</h3>
          </div>
        </div>

        {/* Card 3: Total Sellers */}
        <div className="dashboard-card">
          <div className="card-icon sellers">
            <FaStore />
          </div>
          <div className="card-info">
            <p className="card-title">Total Sellers</p>
            <h3 className="card-value">45</h3>
          </div>
        </div>

        {/* Card 4: Orders */}
        <div className="dashboard-card">
          <div className="card-icon orders">
            <FaClipboardList />
          </div>
          <div className="card-info">
            <p className="card-title">Pending Orders</p>
            <h3 className="card-value">12</h3>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;