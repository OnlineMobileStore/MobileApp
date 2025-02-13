import { useEffect, useState } from "react";
import { getAvgRating } from "../services/review";
import { ProgressBar } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AddReview.module.css"; 

const AverageReview = ({ id }) => {
  const [ratingStats, setRatingStats] = useState(null);

  useEffect(() => {
    const fetchRatingStats = async () => {
      try {
        const response = await getAvgRating(id);
        setRatingStats(response.data);
      } catch (err) {
        console.error("Failed to fetch rating stats", err);
      }
    };

    fetchRatingStats();
  }, [id]);

  if (!ratingStats) return <p className="text-center mt-3">Loading...</p>;

  return (
    <div className="rating-container card p-4 shadow-sm">
      <h4 className="text-center">Customer Ratings</h4>
      <div className="average-rating text-center">
        <h2 className="fw-bold">
          {ratingStats.averageRating.toFixed(1)}{" "}
          <FaStar className="text-warning" />
        </h2>
        <p className="text-muted">Based on {ratingStats.totalReviews} reviews</p>
      </div>

      {/* Star Ratings Breakdown */}
      <div className="rating-breakdown">
        {[
          { stars: 5, count: ratingStats.fiveStars },
          { stars: 4, count: ratingStats.fourStars },
          { stars: 3, count: ratingStats.threeStars },
          { stars: 2, count: ratingStats.twoStars },
          { stars: 1, count: ratingStats.oneStar },
        ].map(({ stars, count }, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <span className="me-2">{stars} <FaStar className="text-warning" /></span>
            <ProgressBar
              now={(count / ratingStats.totalReviews) * 100}
              variant="warning"
              className="flex-grow-1 mx-2"
              style={{ height: "8px" }}
            />
            <span className="small">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AverageReview;
