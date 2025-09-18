import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SellerDashboard.css';
import SellerSidebar from './SellerSidebar';
import Navbar from '../Nav/Navbar';

const SellerDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProductsListed, setTotalProductsListed] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalGrossSales, setTotalGrossSales] = useState(0);

  useEffect(() => {
    const SellerId = localStorage.getItem("SellerId");

    if (!SellerId) {
      console.error("Seller ID not found in local storage.");
      return;
    }

    // Fetch and filter orders
    axios.get(`http://localhost:5000/viewallpurchases`)
      .then(res => {
        console.log("Raw Purchase Data:", res.data.data); // Log the raw data to confirm
        const allPurchases = res.data.data;

        // Filter purchases where *any* product within the purchase's productIds array matches the sellerId
        const sellersOrders = allPurchases.filter(purchase =>
          // Check if productIds array exists and is an array before calling some
          Array.isArray(purchase.productIds) &&
          purchase.productIds.some(product => product.SellerId === SellerId)
        );

        setTotalOrders(sellersOrders.length);

        let revenue = 0;
        let grossSales = 0;

        sellersOrders.forEach(purchase => {
          // Ensure productIds is an array before iterating
          if (Array.isArray(purchase.productIds)) {
            purchase.productIds.forEach(product => {
              if (product.SellerId === SellerId) {
                // Use purchase.quantity as the quantity for this entire purchase
                // If quantity is specific to each product in productIds, you'd need to adjust your backend.
                // For now, assuming purchase.quantity applies to the entire order,
                // and you want to sum up the value of *your* specific products in that order.
                const itemQuantity = parseFloat(purchase.quantity) || 1; // Default to 1 if not a valid number
                const itemTotal = product.price * itemQuantity;
                grossSales += itemTotal;
                revenue += itemTotal;
              }
            });
          }
        });
        setTotalGrossSales(grossSales);
        setTotalRevenue(revenue);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });

    // Fetch and filter products
    axios.get("http://localhost:5000/allproduct")
      .then(res => {
        const allProducts = res.data.data;
        const sellersProducts = allProducts.filter(product => product.SellerId._id === SellerId); // Corrected property name to SellerId
        setTotalProductsListed(sellersProducts.length);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });

  }, []);

  return (
    <div>
      <div className="seller-dashboard-container">
        <SellerSidebar />
        <div className="dashboard-content">
          <h1>Seller Dashboard</h1>
          <div className="cards">
            <div className="card">
              <h3>Total Sales (Gross)</h3>
              <p>${totalGrossSales.toFixed(2)}</p>
            </div>
            <div className="card">
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
            </div>
            <div className="card">
              <h3>Products Listed</h3>
              <p>{totalProductsListed}</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;