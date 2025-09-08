// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CategoryPage = () => {
//   const { name } = useParams();
//   const [categoryProducts, setCategoryProducts] = useState([]);

//   useEffect(() => {
//     axios.get("https://fakestoreapi.com/products")
//       .then(res => {
//         const filtered = res.data.filter(product => product.category === name);
//         setCategoryProducts(filtered);
//       })
//       .catch(err => console.error(err));
//   }, [name]);

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-capitalize">{name} Products</h2>
//       <div className="row">
//         {categoryProducts.map(product => (
//           <div className="col-md-4 mb-4" key={product.id}>
//             <div className="card h-100 shadow-sm">
//               <img src={product.image} className="card-img-top" alt={product.title} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">${product.price}</p>
//                 <p className="card-text">{product.description}</p>
//                 <p className="text-muted">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const CategoryPage = () => {
  const { name } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const filtered = res.data.filter(
          (product) => product.category === name
        );
        setCategoryProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [name]);

  return (
    <div className="container py-5">
      {/* Intro Banner */}
      <div className="text-center mb-5">
        <h1 className="display-5 text-capitalize">{name}</h1>
        <p className="text-muted fs-5">
          Explore our premium collection of {name} products, curated for style,
          performance, and value.
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Product Grid */}
      <div className="row">
        {categoryProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{
                  height: "160px",
                  objectFit: "contain",
                }} 
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title mb-1">{product.title}</h6>
                <small className="text-muted mb-2">${product.price}</small>
                <p className="card-text small text-truncate" title={product.description}>
                  {product.description}
                </p>
                <small className="text-muted mb-2">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </small>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary w-100">
                    <FaShoppingCart className="me-1" />
                    Cart
                  </button>
                  <button className="btn btn-sm btn-outline-danger w-100">
                    <FaHeart className="me-1" />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional or Info Section */}
      <div className="mt-5 p-4 bg-light rounded text-center">
        <h4 className="mb-3">Why shop {name} with us?</h4>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">✅ Trusted Quality</h6>
            <p className="text-muted small">
              All products are sourced from top-rated suppliers and reviewed by thousands.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">🚚 Fast Shipping</h6>
            <p className="text-muted small">
              Get your items delivered quickly with our express shipping options.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">💸 Easy Returns</h6>
            <p className="text-muted small">
              Hassle-free returns within 30 days on all eligible purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
