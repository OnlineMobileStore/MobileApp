import React, { useState } from "react";
import styles from "../../styles/Wishlist.module.css";
import phone from "../../assets/phone.jpg";
import cart from "../../assets/cart.png";
import remove from "../../assets/remove.png";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "iPhone 16",
      description:
        "A18 Bionic chip, ProMotion display, and advanced AI-powered camera system",
      rating: 4.5,
      unitPrice: 45000.0,
      inStock: true,
      image: "/path/to/product-image-1.jpg",
    },
    {
      id: 2,
      name: "iPhone 13",
      description:
        "A16 Bionic chip, advanced camera, and long battery life.",
      rating: 2.5,
      unitPrice: 42000.0,
      inStock: true,
      image: "/path/to/product-image-1.jpg",
    },
    {
      id: 3,
      name: "Redmi 9 Pro",
      description:
        "Powerful performance with Snapdragon processor and stunning display.",
      rating: 3.5,
      unitPrice: 30000.0,
      inStock: true,
      image: "/path/to/product-image-1.jpg",
    },
  ]);

  // Function to handle quantity change
  // const updateQuantity = (id, action) => {
  //   setWishlist((prevWishlist) =>
  //     prevWishlist.map((product) =>
  //       product.id === id
  //         ? {
  //             ...product,
  //             quantity:
  //               action === "increase"
  //                 ? product.quantity + 1
  //                 : product.quantity > 1
  //                 ? product.quantity - 1
  //                 : product.quantity,
  //           }
  //         : product
  //     )
  //   );
  // };

  // Function to handle removing a product
  const removeProduct = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== id)
    );
  };

  // Function to handle adding to cart
  const addToCart = (id) => {
    alert(`Product with ID ${id} added to cart!`);
  };

  return (
    <div className={styles.wishlistContainer}>
      <Navbar/>
     <h2 className={styles.wishlistTitle}>MyWishlist</h2>
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
                  // src={product.image}
                  src={phone}
                  alt={product.name}
                  className={styles.productImage}
                />
              </td>
              <td>
                <p>{product.name}</p>
                <span className={styles.stars}>
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>{" "}
                ({product.rating})
              </td>
              <td>₹{product.unitPrice.toFixed(2)}</td>
              <td>{product.inStock ? "In Stock" : "Out of Stock"}</td>
             
              <td>
                <button
                  onClick={() => addToCart(product.id)}
                  className={styles.cartButton}
                  
                >
                 <img src={cart} alt='' className={styles.image} />
                </button>
              </td>
              <td>
                <button
                  onClick={() => removeProduct(product.id)}
                  className={styles.removeButton}
                >
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
