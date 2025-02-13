import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MyCart.module.css";
import Navbar from "../../components/Navbar";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
} from "../../services/cart";

const MyCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const customerId = localStorage.getItem("customerId");

  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await getCartItems(customerId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const shippingCharges = 10;

  const handleQuantityChange = async (productId, delta) => {
    const updatedItem = cartItems.find((item) => item.productId === productId);
    if (!updatedItem) return;

    const newQuantity = Math.max(1, updatedItem.quantity + delta);

    try {
      const response = await updateCartQuantity(
        customerId,
        productId,
        newQuantity
      );
      if (response.status === "success") {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  price: item.oprice * newQuantity,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    if (!customerId) return;

    try {
      const response = await removeFromCart(customerId, productId);
      if (response.data.status === "success") {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.productId !== productId)
        );
        toast.success("mobile successfully removed from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateFinal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (item.oprice - (item.discount / 100) * item.oprice) * item.quantity,
      0
    );
  };

  const calculateOriginal = () => {
    return cartItems.reduce(
      (total, item) => total + item.oprice * item.quantity,
      0
    );
  };

  const calculateSubtotal = () => {
    return calculateFinal() + shippingCharges;
  };

  return (
    <div>
      <Navbar />
      <div className={styles.cartContent}>
        <h2 className={styles.cartTitle}>My Cart</h2>

        {cartItems.length === 0 ? (
          <p className={styles.emptyCartMessage}>Your cart is empty!</p>
        ) : (
          <div className={styles.scrollableContent}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>Available</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className={styles.image}
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.productId, -1)}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.productId, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <span className="text-muted text-decoration-line-through">
                        ₹{item.oprice}
                      </span>{" "}
                      <span className="text-danger">{item.discount}%</span>{" "}
                      <h6 className="text-success">
                        {item.oprice - (item.discount / 100) * item.oprice}
                      </h6>
                    </td>
                    <td>
                      ₹
                      {(item.oprice - (item.discount / 100) * item.oprice) *
                        item.quantity}
                    </td>
                    <td
                      style={{
                        color:
                          item.productQuantity - item.quantity > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {item.productQuantity - item.quantity > 0
                        ? "In stock"
                        : "Out of stock"}
                    </td>
                    <td>
                      <FaTrashAlt
                        className={styles.deleteBtn}
                        size={18}
                        color="red"
                        onClick={() => handleRemove(item.productId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className={styles.summaryContainer}>
          <h3>Price Summary</h3>
          <table className={styles.summaryTable}>
            <tbody>
              <tr>
                <td>Number of Items:</td>
                <td>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </td>
              </tr>
              <tr>
                <td>Original Price:</td>
                <td>₹{calculateOriginal()}</td>
              </tr>
              <tr>
                <td>Final Price:</td>
                <td>₹{calculateFinal()}</td>
              </tr>
              <tr>
                <td>You saved</td>
                <td style={{ color: "red" }}>
                  - ₹{Math.round(calculateOriginal() - calculateFinal())}
                </td>
              </tr>
              <tr>
                <td>Shipping Charges:</td>
                <td style={{ color: "green" }}>+ ₹{shippingCharges}</td>
              </tr>
              <tr>
                <td className={styles.subtotalLabel}>Subtotal:</td>
                <td className={styles.subtotal}>₹{calculateSubtotal()}</td>
              </tr>
            </tbody>
          </table>
          <button
            className={styles.checkoutButton}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  orderPrice: calculateSubtotal(),
                  cartItems: cartItems.map((item) => ({
                    productId: item.productId,
                    price: item.oprice - (item.discount / 100) * item.oprice, // Calculate the discounted price
                    quantity: item.quantity,
                  })),
                },
              })
            }
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
