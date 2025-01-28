import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/ProductReview.module.css"; // Import CSS module
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const ProductReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState(null); // For handling errors

  const navigate = useNavigate();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!rating || !reviewTitle || !customerName || !reviewContent) {
      setError("All fields are required, and a rating must be selected!");
      return;
    }

    // Simulate API submission
    const isSuccessful = Math.random() > 0.2; // Simulate success/failure (80% success rate)

    if (isSuccessful) {
      // Reset form fields
      setRating(0);
      setReviewTitle("");
      setReviewContent("");
      setCustomerName("");
      setError(null);
      toast.success("Review submitted successfully!");

      // Navigate to product review page
      navigate(`/ProductPage/${productId}`);
    } else {
      setError("Sorry, something went wrong. Please try again.");
      toast.error("Submission failed. Please try again.");
    }
  };

  const ratingTooltips = ["Worst", "Bad", "Average", "Good", "Best"];

  return (
    <div className={styles.reviewContainer}>
      <Navbar/>
      <ToastContainer />
      <div className={styles.titleSection}>
          <h2 style={{marginTop:"50px"}}>How was the Mobile? {productId}</h2>
      </div>

      {/* Add Review Form */}
      <div className={styles.addReviewSection}>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Error message */}
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
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
                  title={ratingTooltips[star - 1]} // Tooltip text
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
          <div style={{textAlign:"center"}}>
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