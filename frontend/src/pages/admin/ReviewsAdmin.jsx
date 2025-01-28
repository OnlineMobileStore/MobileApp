import React, { useEffect, useState } from "react";
import styles from "../../styles/Reviews.module.css";
import phone from "../../assets/phone.jpg";
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar"; // Import TopBar

function ReviewsAdmin() {
  const [product, setProduct] = useState({
    id: 1,
    name: "iPhone 16",
    description:
      "A18 Bionic chip, ProMotion display, and advanced AI-powered camera system",
    cost: "₹45000.00",
    image: "/path/to/product-image-1.jpg",
  });

  const allReviews = [
    {
      id: 1,
      productId: 1,
      name: "Towhidur Rahman",
      rating: 5,
      date: "24-10-2022",
      reviewText:
        "A good upgrade for those with older models, with new features like a powerful A18 chip, close-up photography, and Camera Control and Action Buttons",
    },
    {
      id: 2,
      productId: 1,
      name: "John Doe",
      rating: 4,
      date: "15-09-2022",
      reviewText:
        "Excellent product and amazing quality! I am very happy with my purchase. Will recommend it to friends and family.",
    },
    {
      id: 3,
      productId: 1,
      name: "Jane Smith",
      rating: 5,
      date: "10-08-2022",
      reviewText:
        "Absolutely loved it! Outstanding product, and the service was great. Highly recommend!",
    },
  ];
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const productReviews = allReviews.filter(
      (review) => review.productId === product.id
    );
    setReviews(productReviews);
  }, [product.id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  const getInitials = (name) => {
    const [firstName, lastName] = name.split(" ");
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          position: "fixed",
          top: "0",
          bottom: "0",
          overflowY: "auto",
        }}
      >
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "250px",
            right: "0",
            height: "50px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <TopBar />
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginTop: "50px", // Space for the fixed top bar
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div className={styles.reviewsContainer}>
            <div className={styles.productSection}>
              <img
                src={phone}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>{product.cost}</strong>
                </p>
              </div>
            </div>
            <h2>Reviews</h2>
            <div className={styles.reviewsSummary}>
              <p>Total Reviews: {totalReviews}</p>
              <p>
                Average Rating: {averageRating.toFixed(1)}{" "}
                <span className={styles.stars}>
                  {"★".repeat(Math.round(averageRating))}
                </span>
              </p>
            </div>
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.reviewItem}>
                  <div className={styles.userLogo}>
                    {getInitials(review.name)}
                  </div>
                  <h4>{review.name}</h4>
                  <p>
                    Rating:
                    <span className={styles.stars}>
                      {"★".repeat(review.rating)}
                    </span>
                  </p>
                  <p>Date: {review.date}</p>
                  <p>{review.reviewText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsAdmin;