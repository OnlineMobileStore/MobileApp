import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { BiCart, BiUser } from "react-icons/bi"; // Icons for cart and user
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/'); 
  };

  return (
    <Navbar expand="lg" className="mobile-store-navbar" sticky="top" collapseOnSelect>
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="navbar-brand">
          Mobile Store
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Center section: Search bar and filter */}
          <Nav className="mx-auto">
            {/* Search Bar */}
            <Form className="d-flex search-form">
              <FormControl
                type="text"
                placeholder="Search for mobiles..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Nav>
          {/* Right section: Navigation Links */}
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Nav.Link href="#cart" aria-label="Cart">
              <BiCart /> Cart
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} aria-label="Profile">
                <BiUser /> Profile
                <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/customer/change-profile">
                  Change Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown.Toggle>             
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
