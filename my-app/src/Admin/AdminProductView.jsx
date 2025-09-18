import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminProductView.css";
import AdminSidebar from "./AdminSidebar";

const AdminProductView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/allproduct")
      .then(res => setProducts(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(() => setError("Failed to fetch products."));
  }, []);

  return (
    <div className="seller-dashboard-layout">
      <AdminSidebar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Products</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/upload/${product.image?.filename}`}
                      className="admin-product-img"
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`badge ${product.stock > 0 ? "badge-success" : "badge-danger"}`}>
                      {product.stock > 0 ? "In Stock" : "Sold Out"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductView;
