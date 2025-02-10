import React, { useEffect, useState } from "react";
import { WishlistService } from "../../services/wishlist";
import styles from "../../styles/Wishlist.module.css";
import phone from "../../assets/phone.jpg";
import cart from "../../assets/cart.png";
import remove from "../../assets/remove.png";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const customerId = 1; // Replace with actual logged-in user ID

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from backend
  useEffect(() => {
    WishlistService.getWishlist(customerId).then(setWishlist);
  }, []);

  const handleRemove = async (wishlistId) => {
    await WishlistService.removeFromWishlist(wishlistId);
    setWishlist(wishlist.filter(item => item.id !== wishlistId));
  };

  const handleAddToCart = (id) => {
    alert(`Product with ID ${id} added to cart!`);
  };

  return (
    <div className={styles.wishlistContainer}>
      <Navbar />
      <h2 className={styles.wishlistTitle}>My Wishlist</h2>
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
                <img src={phone} alt={product.name} className={styles.productImage} />
              </td>
              <td>{product.name}</td>
              <td>₹{product.unitPrice.toFixed(2)}</td>
              <td>{product.inStock ? "In Stock" : "Out of Stock"}</td>
              <td>
                <button onClick={() => handleAddToCart(product.id)} className={styles.cartButton}>
                  <img src={cart} alt='' className={styles.image} />
                </button>
              </td>
              <td>
                <button onClick={() => handleRemove(product.id)} className={styles.removeButton}>
                  <img src={remove} alt='' className={styles.image} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
