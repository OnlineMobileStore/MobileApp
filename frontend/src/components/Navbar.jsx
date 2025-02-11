import React, { useEffect,useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown
} from "react-bootstrap";
import { FaHeart} from "react-icons/fa";
import { BiCart, BiUser } from "react-icons/bi"; 
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../services/cart";
// import { useCart } from "../context/CartContext";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");
  // const { cartItems, fetchCartItems} = useCart();
  const [cartItems, setCartItems] = useState(new Set());

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await getCartItems(customerId);
      const cartProductIds = new Set(response.data.map((item) => item.productId));
      setCartItems(cartProductIds);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []); 

  return (
    <Navbar expand="lg" className="mobile-store-navbar" sticky="top" collapseOnSelect>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Mobile Store
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Center section: Search bar */}
          <Nav className="mx-auto">
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
            <Nav.Link as={Link} to="/customer/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/order-tracking">My Orders</Nav.Link>
            <Nav.Link as={Link} to="/wishlist">Wishlist<FaHeart className="text-danger"/></Nav.Link>
            {/* Cart */}
            <Nav.Link as={Link} to="/myCart" aria-label="Cart">
              <BiCart /> Cart 
              {/* <span style={{padding:"4px",color:"white",backgroundColor:"green",borderRadius:"100%"}}>{cartItems.size}</span> */}
            </Nav.Link>

            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/customer/faq">FAQs</Nav.Link>
            {/* Profile Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="profile-dropdown">
                <BiUser /> Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/customer/change-profile">
                  Change Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
