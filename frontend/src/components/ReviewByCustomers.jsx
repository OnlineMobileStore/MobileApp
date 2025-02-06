import React, { useEffect, useState } from "react";
import { getReviewsOfProduct } from "../services/review";

const ReviewByCustomers = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsOfProduct(productId)
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

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-3 border-b">
          <h3 className="text-md font-medium">{review.customerName}</h3>
          <h5 className="text-md font-medium">{review.title}</h5>
          <p className="text-sm text-gray-600">{review.comment}</p>
          <div className="text-yellow-500 font-semibold">
            {Array.from({ length: review.rating }, (_, index) => (
              <span key={index}>⭐</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewByCustomers;