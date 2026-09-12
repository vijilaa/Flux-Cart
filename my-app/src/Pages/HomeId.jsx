import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeId.css';

const HomeId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/Editproduct/${id}`)
      .then((result) => {
        setProduct(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem('UserId');
    if (!userId) {
      alert("Please log in to add products to your cart.");
      navigate('/log');
      return;
    }
    if (!product._id) {
      alert("Product details not loaded yet.");
      return;
    }

    setIsAdding(true);
    axios.post(`http://localhost:5000/Orderid/${userId}/${product._id}`)
      .then((res) => {
        setIsAdding(false);
        alert("Product added to cart!");
        navigate('/vieworder');
      })
      .catch((err) => {
        setIsAdding(false);
        console.error(err);
        alert("Failed to add to cart. Maybe it is already in the cart.");
      });
  };

  return (
    <div className="product-card-size-container">
      <div className="product-image-wrapper">
        <img
          src={`http://localhost:5000/upload/${product.image?.filename}`}
          alt={product.name}
          className="product-image-view"
        />
      </div>
      <div className="product-info">
        <h2 className="product-title-name">{product.name}</h2>
        <p className="product-description">
          <strong>Description:</strong> {product.description}
        </p>
        <div className="product-price-tag-name">${product.price}</div>
        <div className="product-category-badge-cat">
          <strong>Category:</strong> {product.category}
        </div>

        <div className="product-buttons">
          <button 
            className="btn-add-to-cart" 
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
          <Link to={`/Buynow/${product._id}`}> <button className="btn-buy-now">Buy Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HomeId;
