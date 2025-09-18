import React from 'react';
import './AdminDashboard.css'; 
import { FaBoxOpen, FaUsers, FaStore, FaClipboardList } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [count, setcount] = useState();
  const [purchase, setpurchase] = useState();
  const [user, setuser] = useState();
  const [sellers,setsellers]=useState();
  useEffect(() => {


    axios.get("http://localhost:5000/allproduct")
      .then(res => {
        console.log(res);
        setcount(res.data.data.length)

      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });

    axios.get(`http://localhost:5000/viewallpurchases`)
      .then(res => {
        console.log(res);
        setpurchase(res.data.data.length)

      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
    
      axios.get(`http://localhost:5000/viewall`)
      .then(res => {
        console.log(res);
        setuser(res.data.data.length)

      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  
  
      axios.get(`http://localhost:5000/viewallseller`)
      .then(res => {
        console.log(res);
        setsellers(res.data.data.length)

      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });

  }, []);

  return (
     <div className="seller-dashboard-layout">
      <AdminSidebar/>
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>

      <p className="dashboard-subheader">
        Welcome! Here is a summary of your application's status.
      </p>

 
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon products">
            <FaBoxOpen />
          </div>
          <div className="card-info">
            <p className="card-title">Total Products</p>
            <h3 className="card-value">{count}</h3>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon users">
            <FaUsers />
          </div>
          <div className="card-info">
            <p className="card-title">Total Users</p>
            <h3 className="card-value">{user}</h3>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon sellers">
            <FaStore />
          </div>
          <div className="card-info">
            <p className="card-title">Total Sellers</p>
            <h3 className="card-value">{sellers}</h3>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="card-icon orders">
            <FaClipboardList />
          </div>
          <div className="card-info">
            <p className="card-title">Total Orders</p>
            <h3 className="card-value">{purchase}</h3>
          </div>
        </div>

      </div>
    </div>
</div>
  );
};

export default AdminDashboard;