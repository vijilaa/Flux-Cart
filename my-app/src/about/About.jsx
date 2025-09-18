import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruckFast,
  faShieldAlt,
  faTags,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import ecom from "../assets/Images/ecom-1.jpg"

const About = () => {
  return (
    <section className="about-us-section">
      <div className="con container">
        <div className="about-header">
          <h1>About Flux Cart</h1>
          <p>Your trusted partner in seamless online shopping.</p>
        </div>

        <div className="about-description">
          <p>
            Founded in 2020, ShopEase was born out of a vision to make online
            shopping effortless and reliable. We offer a curated selection of
            top-quality products across fashion, electronics, home, and more —
            all backed by excellent customer service.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faTruckFast} className="icon" />
            <h3>Fast Delivery</h3>
            <p>Nationwide delivery within 2-4 business days, guaranteed.</p>
          </div>

          <div className="feature-card">
            <FontAwesomeIcon icon={faShieldAlt} className="icon" />
            <h3>Secure Shopping</h3>
            <p>Advanced encryption and buyer protection on every order.</p>
          </div>

          <div className="feature-card">
            <FontAwesomeIcon icon={faTags} className="icon" />
            <h3>Best Deals</h3>
            <p>Exclusive discounts and seasonal offers you’ll love.</p>
          </div>

          <div className="feature-card">
            <FontAwesomeIcon icon={faHeadset} className="icon" />
            <h3>24/7 Support</h3>
            <p>Real people. Real help. Always here when you need us.</p>
          </div>
        </div>

        <div className="about-image">
          <img
            src={ecom}
            alt="Our Team"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
