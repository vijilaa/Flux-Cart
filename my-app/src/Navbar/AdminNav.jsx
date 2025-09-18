import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Headbar.css';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminNav() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("SellerId");
        navigate('/');
    };

    return (
        <div className="modern-navbar-wrapper">
            <Navbar bg="light" expand="sm" className="modern-navbar-container">
                <Container>
                    <Navbar.Toggle aria-controls="mynavbar" />
                    <Navbar.Collapse id="mynavbar">
                        <Nav className="modern-nav-links">
                            <div className="modern-nav-content-left">
                                <Nav.Link as={Link} to="/adside" className="text-dark">Home</Nav.Link>
                                <Nav.Link as={Link} to="/Seller-about" className="text-dark">About</Nav.Link>
                                <Nav.Link as={Link} to="/Service-seller" className="text-dark">Services</Nav.Link>
                                <Nav.Link as={Link} to="/seller-contact" className="text-dark">Contact</Nav.Link>
                            </div>

                            <div className="modern-nav-actions-right">
                                <button
                                    className="btn rounded-pill modern-logout-btn"
                                    onClick={handleLogout}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                                </button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AdminNav;