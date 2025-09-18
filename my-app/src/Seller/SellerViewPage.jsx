import React, { useState, useEffect } from 'react';
import './SellerViewPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';

const SellerViewPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const SellerId = localStorage.getItem("SellerId");
    if (!SellerId) return;

    axios.get("http://localhost:5000/allproduct")
      .then(res => {
        const sellerProducts = res.data.data.filter(p => p.SellerId._id === SellerId);
        setFilteredProducts(sellerProducts);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
      setFilteredProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="seller-dashboard-layout">
      <SellerSidebar />
      <div className="seller-content-container">
        <h1 className="page-title">My Products</h1>
        {filteredProducts.length === 0 ? (
          <p>You have not added any products yet.</p>
        ) : (
          <div className="card-grid">
            {filteredProducts.map(product => (
              <div className="product-card" key={product._id}>
                <img
                  src={`http://localhost:5000/upload/${product.image?.filename}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <div className="button-group">
                  <Link to={`/ProductEdit/${product._id}`}>
                    <button className="btn-edit">Edit</button>
                  </Link>
                  <button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerViewPage;
