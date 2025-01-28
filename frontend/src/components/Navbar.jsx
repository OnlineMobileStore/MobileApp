import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { BiCart, BiUser } from "react-icons/bi"; // Icons for cart and user
import "./Navbar.css";

const NavbarComponent = () => {
  return (
    <Navbar
      expand="lg"
      className="mobile-store-navbar"
      sticky="top"
      collapseOnSelect
    >
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

            {/* Filter Dropdown */}
            {/* <Dropdown className="filter-dropdown ms-3">
              <Dropdown.Toggle variant="outline-secondary" id="filter-dropdown">
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#price">Price: Low to High</Dropdown.Item>
                <Dropdown.Item href="#price-desc">Price: High to Low</Dropdown.Item>
                <Dropdown.Item href="#rating">Rating</Dropdown.Item>
                <Dropdown.Item href="#brand">Brand</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>

          {/* Right section: Navigation Links */}
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Nav.Link href="#cart">
              <BiCart /> Cart
            </Nav.Link>
            <Nav.Link href="#profile">
              <BiUser /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
