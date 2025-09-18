import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; 


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/allproduct")
      .then(res => {
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);


  
  return (
    <div className="home-page">
   
      <section className="product-gallery py-5">
        <div className="container">
          <h2 className="section-header text-center mb-5">Discover Our Collection</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>

                {product.stock <= 0 ? (
                  <div className="product-card-wrapper is-sold">
                    <div className="product-img-container">
                      <img
                        src={`http://localhost:5000/upload/${product.image?.filename}`}
                        className="product-image"
                        alt={product.name}
                      />
         
                      <div className="sold-out-overlay">
                        <span>Sold Out</span>
                      </div>
                    </div>
                    <div className="product-info-container">
                      <h5 className="product-title">{product.name}</h5>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </div>
                ) : (
                
                  <Link to={`/ViewbyId/${product._id}`} className="product-link">
                    <div className="product-card-wrapper">
                      <div className="product-img-container">
                        <img
                          src={`http://localhost:5000/upload/${product.image?.filename}`}
                          className="product-image"
                          alt={product.name}
                        />
                      </div>
                      <div className="product-info-container">
                        <h5 className="product-title">{product.name}</h5>
                        <p className="product-price">${product.price}</p>
                        <div className="view-details-btn">
                          <span>View Details</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;