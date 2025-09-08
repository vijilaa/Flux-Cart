import React, { useState, useEffect } from 'react';
import './SellerViewPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';

// It's good practice to handle the case where the products prop is not passed
const SellerViewPage = ({ products = [], setProducts }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const SellerId= localStorage.getItem("SellerId"); // Corrected variable name
        if (!SellerId) {
            console.error("Seller ID not found in local storage.");
            return;
        }

        axios.get("http://localhost:5000/allproduct")
            .then(res => {
                console.log(res);
                
                // Filter products based on the seller's ID
                const sellerProducts = res.data.data.filter(product => product.SellerId._id === SellerId);
                setFilteredProducts(sellerProducts);
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
            });
    }, []); // Dependency array is empty to run once on mount

    // Edit a product (sets up the edit state)
    const handleEdit = (product) => {
        setEditingId(product._id); // Use the unique MongoDB ID
        setEditData(product);
    };

    // Save edited row
    const handleSave = () => {
        // Here you would typically make an API call to update the product
        // For now, it just updates the local state
        setFilteredProducts(prev =>
            prev.map(prod => (prod._id === editingId ? { ...editData } : prod))
        );
        setEditingId(null);
        setEditData({});
    };

    // Cancel edit
    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    // Delete a row
    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this product?")) {
                await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
                setFilteredProducts(prev => prev.filter(product => product._id !== id));
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Handle field changes in edit mode
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    return (
        // Main container for the entire page layout
        <div className="seller-dashboard-layout">
            <SellerSidebar />
            <div className="seller-content-container">
                <h1 className="page-title">My Products</h1>

                {filteredProducts.length === 0 ? (
                    <p className="no-products-message">You have not added any products yet.</p>
                ) : (
                    <div className="card-grid">
                        {filteredProducts.map(product =>
                            editingId === product._id ? ( // Use product._id for comparison
                                // EDITING STATE CARD
                                <div className="product-card editing" key={product._id}>
                                    <img
                                        src={`http://localhost:5000/upload/${product.image?.filename}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                    />
                                    <textarea
                                        name="description"
                                        value={editData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        value={editData.category}
                                        onChange={handleChange}
                                        placeholder="Category"
                                    />
                                    <input
                                        type="number"
                                        name="stock"
                                        value={editData.stock}
                                        onChange={handleChange}
                                        placeholder="Stock"
                                    />
                                    <div className="button-group">
                                        <button className="btn-save" onClick={handleSave}>Save</button>
                                        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                // DEFAULT VIEW CARD
                                <div className="product-card" key={product._id}>
                                    <img
                                        src={`http://localhost:5000/upload/${product.image?.filename}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <h3>{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
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
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerViewPage;