import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProductWithRating } from "../../services/review";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Importing Star Icons

const ReviewsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductWithRating();
        console.log("API Response:", response); // Log the whole response to inspect its structure

        // Check if response has 'data' or 'results' or other properties to extract products
        if (response && response.data) {
          setProducts(response.data);
        } else if (response && response.results) {
          setProducts(response.results); // Adjust according to your actual response format
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProduct = (id) => {
    navigate("/product-details", { state: { id } });
  };

  // Function to generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} color="#FFD700" />); // Full star
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} color="#FFD700" />); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflowY: "auto" }}>
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
          <h2 style={{ margin: "0", fontSize: "18px" }}>
            <TopBar />
          </h2>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginTop: "50px",
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h1 className="fw-bold mb-4">Products with Reviews</h1>

          {/* Loading & Error Handling */}
          {loading && !error && <p className="text-center">Loading products...</p>}
          {error && !loading && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-center">No products available at the moment.</p>
          )}

          {/* Products Grid */}
          {!loading && !error && products?.length > 0 && (
            <div className="container">
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm border-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => handleProduct(product.id)}
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title fw-bold">{product.productName}</h6>
                        <div className="mb-1">{renderStars(product.averageRating)}</div>
                        <p className="text-muted">
                          ({product.averageRating.toFixed(1)} / {product.totalReviews} reviews)
                        </p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleProduct(product.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAdmin;
