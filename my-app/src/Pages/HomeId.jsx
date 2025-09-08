import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './HomeId.css';

const HomeId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

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
   console.log(userId);
   
  if (!userId || !product._id){
    console.log("not found");
    
  }
     axios.post(`http://localhost:5000/Orderid/${userId}/${product._id}`)
    .then((res) => {
      alert("Product added to cart!");
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to add to cart");
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
         <Link to={'/vieworder'}>
          <button className="btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
       </Link>
         <Link to={`/Buynow/${product._id}`}> <button className="btn-buy-now">Buy Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HomeId;
