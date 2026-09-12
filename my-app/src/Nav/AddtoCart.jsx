import React, { useState, useEffect } from 'react';
import "./AddtoCart.css";
import axios from 'axios';
import CartFooter from './CartFooter';
import { Link } from 'react-router-dom';

const AddtoCart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('UserId');

    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5000/userorders/${userId}`)
      .then(res => {
        setOrders(res.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setError("There was an error fetching your cart items.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (orderId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`http://localhost:5000/deleteorder/${orderId}`);
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the item from your cart.");
    }
  }

  if (loading) {
    return <div className="AddtoCart-loading">Loading your cart...</div>;
  }

  if (error) {
    return <div className="AddtoCart-error">{error}</div>;
  }

  return (
    <div>
      <div className="AddtoCart-container"> 
        {orders.length > 0 ? (
          orders.map(order => (
            <div className="orderr-card-size-" key={order._id}>
              <div className="orderr-image-wrapper">
                <img
                  src={`http://localhost:5000/upload/${order.ProductId?.image?.filename}`}
                  alt={order.ProductId?.name}
                  className="orderr-image-view"
                />
              </div>
              <div className="orderr-info">
                <h2 className="orderr-title-name">{order.ProductId?.name}</h2>
                <p className="orderr-description">
                  <strong>Description:</strong> {order.ProductId?.description}
                </p>
                <div className="orderr-price-tag-name">${order.ProductId?.price}</div>
                <div className="orderr-category-badge-cat">
                  <strong>Category:</strong> {order.ProductId?.category}
                </div>
                <div className="orderr-buttons">
                  <button className="btn-add-to-cart-order" onClick={() => handleDelete(order._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-message">Your cart is empty.</div>
        )}
      </div>
      <CartFooter orders={orders}></CartFooter>
    </div>
  );
};

export default AddtoCart;