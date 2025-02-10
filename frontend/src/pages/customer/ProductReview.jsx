
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/ProductReview.module.css";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const ProductReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [productId, setProductId] = useState("");  // State for Product ID
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!rating || !reviewTitle || !customerName || !reviewContent || !productId) {
      setError("All fields are required, and a rating must be selected!");
      return;
    }

    try {
      // API Request to Submit Review
      const response = await fetch("http://localhost:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          customerName,
          reviewTitle,
          reviewContent,
          rating,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Review submitted successfully!");

        // Navigate to the next page with the product ID
        navigate(`/ProductPage/${data.productId}`);
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Submission failed. Please try again.");
    }
  };

  const ratingTooltips = ["Worst", "Bad", "Average", "Good", "Best"];

  return (
    <div className={styles.reviewContainer}>
      <Navbar />
      <ToastContainer />
      <div className={styles.titleSection}>
        <h2 style={{ marginTop: "50px" }}>How was the Mobile?</h2>
      </div>

      <div className={styles.addReviewSection}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.formGroup}>
            <label htmlFor="product-id">Product ID:</label>
            <input
              type="text"
              id="product-id"
              className={styles.input}
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>

          <div className={styles.ratingSection}>
            <label>Your Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${
                    star <= (hoverRating || rating) ? styles.filled : ""
                  }`}
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  title={ratingTooltips[star - 1]}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="review-title">Review Title:</label>
            <input
              type="text"
              id="review-title"
              className={styles.input}
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="review-content">Your Review:</label>
            <textarea
              id="review-content"
              className={styles.textarea}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customer-name">Your Name:</label>
            <input
              type="text"
              id="customer-name"
              className={styles.input}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
