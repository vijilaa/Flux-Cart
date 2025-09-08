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

    // It's good practice to handle the case where userId might not exist
    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:5000/viewallorder")
      .then(res => {
        // Filter the orders for the current user
        const userOrders = res.data.data.filter(order => order.UserId === userId);
        setOrders(userOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setError("There was an error fetching your cart items.");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDelete = async (orderId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        // Use the specific order ID for deletion
        await axios.delete(`http://localhost:5000/deleteorder/${orderId}`);
        // Update the state by filtering out the deleted order by its unique _id
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, provide user feedback on deletion failure
      alert("Failed to delete the item from your cart.");
    }
  }

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
console.log(orders);

  return (
    <div>
      {orders.length > 0 ? (
        orders.map(order => (
          // Use the unique order._id as the key for the list item
          <div className="orderr-card-size-" key={order._id}>
            <div className="orderr-image-wrapper">
              {/* Defensive coding: check if ProductId and image exist before accessing filename */}
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
                {/* Pass the unique order._id to the delete handler */}
                <button className="btn-add-to-cart-order" onClick={() => handleDelete(order._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Your cart is empty.</div>
      )}

      <CartFooter orders={orders}></CartFooter>

    </div>
  );
};

export default AddtoCart;