import React, { useEffect, useState } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminProductView.css"; // We will create this CSS file next

const AdminProductView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch all products when the component loads
    axios.get("http://localhost:5000/allproduct")
      .then(res => {
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setError("The fetched data is not an array.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please check the console for more details.");
      });
  }, []); // The empty dependency array means this runs once on component mount

  return (
    <div className="admin-product-view-container">
      <div className="container mt-4">
        <h2 className="text-center mb-4 admin-product-header">All Products</h2>
        
        {/* --- Error Handling --- */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* --- Product Table --- */}
        {!error && (
          <div className="table-responsive">
            <table className="table table-hover admin-product-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`http://localhost:5000/upload/${product.image?.filename}`}
                          className="admin-product-img"
                          alt={product.name}
                        />
                      </td>
                      <td className="product-name-cell">{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        {/* --- Stock Status Indicator --- */}
                        {product.stock > 0 ? (
                          <span className="badge badge-success">In Stock</span>
                        ) : (
                          <span className="badge badge-danger">Sold Out</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  // --- Shows if no products are found ---
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductView;