import React from "react";
import { useParams } from "react-router-dom";
import styles from '../../styles/ProductPage.module.css';
import phone from "../../assets/phone.jpg";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const ProductPage = () => {
  const { productId } = useParams();

  // Example product data (could be fetched from an API)
  const product = {
    id: productId,
    name: "Example Product",
    description: "This is a detailed description of the product.",
    price: "$100",
    size: "Medium",
    brand: "Brand Name",
    operatingSystem: "Android",
    ram: "4 GB",
    storage: "64 GB",
    screenSize: "6.5 inches",
    imageUrl: "https://via.placeholder.com/300", // Sample image
    reviews: [
      { 
        customerName: "John Doe", 
        reviewTitle: "Great Product", 
        reviewContent: "I loved it! Highly recommend.", 
        rating: 5, 
        date: "2025-01-01" 
      },
      { 
        customerName: "Jane Doe", 
        reviewTitle: "Decent", 
        reviewContent: "Good value for money.", 
        rating: 3, 
        date: "2025-01-10" 
      },
    ],
  };

  return (
    <div className={styles.productPageContainer}>
      <Navbar/>
      <div className={styles.productDetailsContainer}>
        {/* Product Image */}
        <div className={styles.imageContainer}>
          <img src={phone} alt={product.name} className={styles.productImage} />
        </div>

        {/* Product Information */}
        <div className={styles.productInfoContainer}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Operating System:</strong> {product.operatingSystem}</p>
          <p><strong>RAM:</strong> {product.ram}</p>
          <p><strong>Storage:</strong> {product.storage}</p>
          <p><strong>Screen Size:</strong> {product.screenSize}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <h3>Reviews ({product.reviews.length})</h3>
      <div className={styles.reviewGridContainer}>
      
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <h4>{review.reviewTitle}</h4>
              <p>
                <strong>By:</strong> {review.customerName} on {review.date}
              </p>
              <div className={styles.reviewRating}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} className={styles.starFilled}>★</span>
                ))}
              </div>
              <p>{review.reviewContent}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;