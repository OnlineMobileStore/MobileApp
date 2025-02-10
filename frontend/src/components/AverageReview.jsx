import { useEffect, useState } from "react";
import { getAvgRating } from "../services/review";

const AverageReview = ({id}) => {
    const [ratingStats, setRatingStats] = useState(null);

    useEffect(() => {
        const fetchRatingStats = async () => {
            try {
                const response = await getAvgRating(id);
                setRatingStats(response.data);
            } catch (err) {
                console.log("Failed to fetch rating stats");
            } 
        };

        fetchRatingStats();
    }, []);

    if (!ratingStats) return <p>Loading...</p>;

    return (
        <div>
            <h2>Average Rating: {ratingStats.averageRating} ⭐</h2>
            <p>Total Reviews: {ratingStats.totalReviews}</p>
            <ul>
                <li>⭐⭐⭐⭐⭐ - {ratingStats.fiveStars}</li>
                <li>⭐⭐⭐⭐ - {ratingStats.fourStars}</li>
                <li>⭐⭐⭐ - {ratingStats.threeStars}</li>
                <li>⭐⭐ - {ratingStats.twoStars}</li>
                <li>⭐ - {ratingStats.oneStar}</li>
            </ul>
        </div>
    );
};

export default AverageReview;
