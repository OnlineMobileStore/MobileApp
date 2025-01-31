import { useEffect, useState } from "react";
import axios from "axios";
const ProductAverage = () => {
    const [ratingStats, setRatingStats] = useState(null);

    useEffect(() => {
        const fetchRatingStats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reviews/rating-stats/2`);
                console.log(response.data);
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
                <li>⭐⭐⭐⭐⭐ : {ratingStats.fiveStars}</li>
                <li>⭐⭐⭐⭐ : {ratingStats.fourStars}</li>
                <li>⭐⭐⭐ : {ratingStats.threeStars}</li>
                <li>⭐⭐ : {ratingStats.twoStars}</li>
                <li>⭐ : {ratingStats.oneStar}</li>
            </ul>
        </div>
    );
};

export default ProductAverage;
