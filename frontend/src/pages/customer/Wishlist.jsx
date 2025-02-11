import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../services/wishlist";
import { addToCart } from "../../services/cart";
import { toast } from "react-toastify";
import styles from "../../styles/Wishlist.module.css";
import cart from "../../assets/cart.png";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const customerId = localStorage.getItem("customerId"); // Get logged-in user ID

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from backend
  useEffect(() => {
    if (customerId) {
      getWishlist(customerId).then(setWishlist);
    }
  }, []);

  const fetchWishlistItems = async () => {
    if (!customerId) return;
    try {
      const response = await getWishlist(customerId);
      setWishlist(response);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlist(wishlist.filter((item) => item.id !== wishlistId));
      toast.success("Removed from Wishlist!");
    } catch (error) {
      toast.error("Failed to remove from Wishlist");
    }
  };

  // Add product to cart
  const handleAddToCart = async (productId, price) => {
    try {
      const response = await addToCart(customerId, productId, price);
      if (response.status === 200) {
        toast.success("Added to Cart!");
      } else {
        toast.error("Failed to add to Cart");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.wishlistContainer}>
        <h2 className={styles.wishlistTitle}>My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className={styles.emptyWishlist}>Your wishlist is empty.</p>
        ) : (
          <table className={styles.wishlistTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th>Add to Cart</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr key={product.id} className={styles.wishlistRow}>
                  <td>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className={styles.productImage}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
                  <td>
                    <button
                      onClick={() => handleAddToCart(product.id, product.price)}
                      className={styles.cartButton}
                    >
                      <FaShoppingCart size={18} color="green" />
                    </button>
                  </td>
                  <td>
                    <FaTrashAlt
                      className={styles.removeButton}
                      size={18}
                      color="red"
                      onClick={() => handleRemove(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
