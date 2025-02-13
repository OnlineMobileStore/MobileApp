import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/AddReview.module.css";
import Navbar from "../../components/Navbar";
import { addReview } from "../../services/review";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) {
      setError("Customer ID is missing. Please log in again.");
      return;
    }
    if (!rating || !reviewTitle || !reviewContent || !productId) {
      setError("All fields are required, and a rating must be selected!");
      return;
    }

    try {

      const response = await addReview(productId,customerId,reviewTitle,reviewContent,rating);
      if(response.status===200){
        toast.success("Review submitted successfully!");
        navigate("/customer/productPage", { state: { id: response.data.productId } });
      }
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Submission failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };
  const ratingTooltips = ["Worst", "Bad", "Average", "Good", "Best"];

  return (
    <div className={styles.reviewContainer}>
      <Navbar />
      <div className={styles.titleSection}>
        <h3 style={{ marginTop: "10px" }}>How was the Mobile?</h3>
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

          <div style={{ marginTop: "15px" }}>
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

export default AddReview;
