import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">Mobile Store</h3>
            <p>
              Explore the best smartphones, accessories, and deals at Mobile Store. Quality products with excellent service.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <p>Connect with us on social media:</p>
            <div className="footer-socials">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p>Mobile Store, 1234 Street Name, City, State, ZIP</p>
            <p>Email: support@mobilestore.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="footer-links">
          <div>
            <h4>Information</h4>
            <ul>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4>Service</h4>
            <ul>
              <li>FAQs</li>
              <li>Returns</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4>My Account</h4>
            <ul>
              <li>Login</li>
              <li>My Orders</li>
              <li>Wishlist</li>
            </ul>
          </div>
          <div>
            <h4>Our Offers</h4>
            <ul>
              <li>Latest Deals</li>
              <li>New Arrivals</li>
              <li>Special Discounts</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mobile Store. All rights reserved.</p>
          <div className="footer-payment-icons">
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="MasterCard" />
            <img src="/paypal.png" alt="PayPal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
