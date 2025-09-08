import React, { useState, useEffect } from 'react';
import './CartFooter.css';
import { useNavigate } from 'react-router-dom';

const CartFooter = (props) => {
  const [total, setTotal] = useState(0);
  const [productIds, setProductIds] = useState([]); // State to hold all ProductIds
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the total and extract ProductIds
    const addedProductsTotal = props.orders.reduce((sum, order) => {
      if (order.ProductId && typeof order.ProductId.price === 'number') {
        return sum + order.ProductId.price;
      }
      return sum;
    }, 0);

    // Extract all product IDs
    const ids = props.orders
      .filter(order => order.ProductId && order.ProductId._id) // Ensure ProductId and its _id exist
      .map(order => order.ProductId._id);

    setTotal(addedProductsTotal);
    setProductIds(ids);

  }, [props.orders]);

  const handlebuydetails = () => {
    // Navigate to /Buynow and pass productIds in the state
    navigate('/Buynow', { state: { productIds: productIds } });
  }

  return (
    <div className="cart-footer">
      <div className="cart-total">
        <span className="label">Total:</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>
      <button className="add-to-cart-btn" onClick={handlebuydetails}>  Buy Now </button>
    </div>
  );
};

export default CartFooter;