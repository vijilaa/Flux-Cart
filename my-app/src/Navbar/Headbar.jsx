import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Headbar.css';

function Headbar() {
  return (
    <div className="change">
      <Navbar bg="light" expand="sm" className="full_nav">
        <Container>
          <Navbar.Toggle aria-controls="mynavbar" />
          <Navbar.Collapse id="mynavbar">
            <Nav className="me-auto" style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Nav.Link as={Link} to="" className="text-dark">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-dark">About</Nav.Link>
              <Nav.Link as={Link} to="/Service" className="text-dark">Services</Nav.Link>
              <Nav.Link as={Link} to="/phone-con" className="text-dark">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Headbar;