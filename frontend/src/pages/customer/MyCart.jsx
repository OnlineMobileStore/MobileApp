import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyCart.module.css'; 
import phone from "../../assets/phone.jpg";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const CartPage = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Product 1', image: 'phone.jpg', unitPrice: 50, quantity: 1 },
    { id: 2, name: 'Product 2', image: 'image2.jpg', unitPrice: 30, quantity: 2 },
    { id: 3, name: 'Product 3', image: 'image3.jpg', unitPrice: 20, quantity: 1 },
  ]);

  const shippingCharges = 10;

  const handleQuantityChange = (id, delta) => {
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return wishlist.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };

  const calculateSubtotal = () => {
    return calculateTotal() + shippingCharges;
  };

  return (
    <div className={styles.cartContainer}>
      <Navbar/>
      <div className={styles.cartContent}>
        <h2 className={styles.cartTitle}>MyCart</h2>
        <div className={styles.scrollableContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={phone} alt={item.name} className={styles.image} />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </td>
                  <td>₹{item.unitPrice}</td>
                  <td>₹{item.unitPrice * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.summaryContainer} style={{ position: 'relative', marginTop: '20px' }}>
        <h3>Price Summary</h3>
        <table className={styles.summaryTable}>
          <tbody>
            <tr>
              <td>Number of Items:</td>
              <td>{wishlist.reduce((total, item) => total + item.quantity, 0)}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>₹{calculateTotal()}</td>
            </tr>
            <tr>
              <td>Shipping Charges:</td>
              <td>₹{shippingCharges}</td>
            </tr>
            <tr>
              <td className={styles.subtotalLabel}>Subtotal:</td>
              <td className={styles.subtotal}>₹{calculateSubtotal()}</td>
            </tr>
          </tbody>
        </table>
        <button 
          className={styles.checkoutButton} 
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
