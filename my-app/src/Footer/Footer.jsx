import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebookF,
    faTwitter,
    faPinterestP,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4">
            <div className="container">
                <div className="row text-center text-md-start">
                 
                    <div className="col-md-3 mb-4">
                        <a className="navbar-brand text-white" href="#" style={{ fontSize: '1.5rem' }}>
                         FLUX <span className="fw-bold">CART</span>
                        </a>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3 footer-icon-row">
                            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faPinterestP} />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>

               
                    <div className="col-md-3 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled text-white-50 footer-font">
                            <li><a className="nav-link p-0" href="#">Home</a></li>
                            <li><a className="nav-link p-0" href="#">About</a></li>
                            <li><a className="nav-link p-0" href="#">Services</a></li>
                            <li><a className="nav-link p-0" href="#">Contact</a></li>
                            <li><a className="nav-link p-0" href="#">Login</a></li>
                        </ul>
                    </div>

                
                    <div className="col-md-3 mb-4">
                        <h5>Terms & Policies</h5>
                        <ul className="list-unstyled text-white-50 footer-font">
                            <li><a className="nav-link p-0" href="#">Terms & Conditions</a></li>
                            <li><a className="nav-link p-0" href="#">FAQ</a></li>
                            <li><a className="nav-link p-0" href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                
                    <div className="col-md-3 mb-4">
                        <h5>Get In Touch</h5>
                        <ul className="list-unstyled text-white-50 footer-font">
                            <li><a className="nav-link p-0" href="tel:04712525444">0471-2525444</a></li>
                            <li><a className="nav-link p-0" href="mailto:blogsphere@gmail.com">vijilajames221@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
         <hr className="text-white" style={{ opacity: 0.2 }} />

          
                <div className="text-center pb-3">
                    <p className="text-white-50 footer-font m-0">© 2025 MINI ZOO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
