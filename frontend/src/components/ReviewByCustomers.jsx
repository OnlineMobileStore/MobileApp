import React, { useEffect, useState } from "react";
import { getReviewsOfProduct } from "../services/review";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ReviewByCustomer.css"; // Custom CSS

const ReviewByCustomers = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsOfProduct(productId);
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) return <p className="text-center mt-3">Loading reviews...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;
  if (reviews.length === 0) return <p className="text-center text-muted">No reviews available.</p>;

  return (
    <div className="container review-container p-4 shadow-sm rounded">
      <h4 className="text-center mb-4">Customer Reviews</h4>
      {reviews.map((review) => (
        <div key={review.id} className="review-card d-flex align-items-start mb-3 p-3 rounded shadow-sm">
          {/* Profile logo */}
          <div className="profile-logo me-3">
            {review.customerName.slice(0, 2).toUpperCase()}
          </div>
          
          {/* Review content */}
          <div>
            <h5 className="fw-bold mb-1">{review.customerName}</h5>
            <h6 className="fw-semibold text-muted">{review.title}</h6>
            <p className="text-secondary mb-1">{review.comment}</p>

            {/* Star Rating */}
            <div className="rating-stars">
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className="text-warning" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewByCustomers;
