import React from 'react';
import './Service.css';

const Service = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Premium E-Commerce Services</h1>
          <p>Providing top-notch solutions to elevate your online business.</p>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="our-services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <div className="service-icon">ICON</div>
            <h3>Website Development</h3>
            <p>We build fast, secure, and scalable e-commerce websites tailored to your brand.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">ICON</div>
            <h3>Digital Marketing</h3>
            <p>Our marketing strategies are designed to increase your online visibility and drive sales.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">ICON</div>
            <h3>SEO Optimization</h3>
            <p>We help you rank higher on search engines to attract more organic traffic.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Consultation</h3>
            <p>We start with a detailed consultation to understand your needs.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Strategy & Design</h3>
            <p>We create a customized strategy and design mockup for your approval.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Development & Launch</h3>
            <p>Our team develops and launches your project with precision.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits-container">
          <div className="benefit">
            <h3>Expert Team</h3>
            <p>Our team consists of experienced professionals dedicated to your success.</p>
          </div>
          <div className="benefit">
            <h3>Customer-Centric</h3>
            <p>We prioritize your needs and work closely with you to achieve your goals.</p>
          </div>
          <div className="benefit">
            <h3>Proven Results</h3>
            <p>We have a track record of delivering exceptional results for our clients.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>"Their team is professional, and the results exceeded our expectations."</p>
            <h4>- Jane Doe, CEO of Company</h4>
          </div>
          <div className="testimonial">
            <p>"A fantastic experience from start to finish. Highly recommended!"</p>
            <h4>- John Smith, Founder of Startup</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Grow Your Business?</h2>
        <p>Contact us today to get started with a free consultation.</p>
        <button className="cta-button">Get in Touch</button>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>What is the typical project timeline?</h3>
            <p>The timeline for a project varies depending on the scope and complexity, but we generally aim to complete projects within 4-8 weeks.</p>
          </div>
          <div className="faq-item">
            <h3>How much do your services cost?</h3>
            <p>Our pricing is customized based on the specific needs of each client. Please contact us for a detailed quote.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;