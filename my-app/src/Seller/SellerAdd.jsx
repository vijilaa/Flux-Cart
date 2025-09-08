import React, { useState } from 'react';
import './SellerAdd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';

const SellerAdd = () => {
  const sellerId = localStorage.getItem("SellerId");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
    SellerId: sellerId
  });

  const [preview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('SellerId', formData.SellerId);
    if (formData.image) {
      data.append('image', formData.image);
    }

    axios.post("http://localhost:5000/productregister", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((result) => {
      console.log(result);
      alert("Product added successfully!");
      navigate("/view"); // Or to the seller's product list page
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to add product.");
    });
  };

  return (
    // This is the new main container that establishes the flex layout
    <div className="seller-dashboard-layout">
   <SellerSidebar/>
      <div className='seller-add-product-container'>
        <div className="add-product">
          <h1>Add New Product</h1>
          <div className="image-upload-group">
            {/* Display a placeholder if no image is selected */}
            <img src={preview || "https://via.placeholder.com/160"} alt="" />
            <label htmlFor="file-upload" className="custom-file-input">
              Choose Image
            </label>
            <input 
              id="file-upload"
              type="file" 
              name="image" 
              onChange={handleFileChange} 
              accept="image/*"
            />
          </div>
          <form className="add-product-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short product description"
              required
            />

            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 49.99"
              step="0.01"
              required
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics, Clothing"
              required
            />

            <label htmlFor="stock">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Number of items available"
              required
            />
           
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerAdd;