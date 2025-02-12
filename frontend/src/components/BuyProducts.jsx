import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/BuyProducts.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { giveAvgRating } from "../services/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartItems } from "../services/cart";

const BuyProducts = ({ products = [] }) => {
  const navigate = useNavigate();
  const filters = {
    brands: ["Samsung", "Apple", "OnePlus"],
    camera: ["12 MP", "48 MP", "64 MP"],
    ram: ["4GB", "6GB", "8GB"],
    storage: ["64GB", "128GB", "256GB"],
    screenSize: ['5.5"', '6.0"', '6.5"'],
  };
  const maxStars = 5;

  const [avgRating, setAvgRating] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState("default");
  const [cartItems, setCartItems] = useState(new Set());
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsMap = {};
        for (const product of products) {
          const ratingData = await giveAvgRating(product.id);
          ratingsMap[product.id] = ratingData.averageRating;
        }
        setAvgRating(ratingsMap);
      } catch (err) {
        console.error("Failed to fetch rating stats", err);
      }
    };

    if (products.length > 0) {
      fetchRatings();
    }
  }, [products]);

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterKey]) {
        updatedFilters[filterKey] = updatedFilters[filterKey].includes(value)
          ? updatedFilters[filterKey].filter((v) => v !== value)
          : [...updatedFilters[filterKey], value];
      } else {
        updatedFilters[filterKey] = [value];
      }
      return updatedFilters;
    });
  };

  const applyFilters = () => setCurrentPage(1);
  const clearFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const filterProducts = () => {
    let filtered = products;

    Object.keys(selectedFilters).forEach((key) => {
      if (selectedFilters[key]?.length) {
        filtered = filtered.filter((product) =>
          selectedFilters[key].includes(product[key])
        );
      }
    });

    if (sortBy === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const paginateProducts = (filteredProducts) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredProducts = filterProducts();
  const paginatedProducts = paginateProducts(filteredProducts);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsMap = {};
        for (const product of products) {
          const ratingData = await giveAvgRating(product.id);
          ratingsMap[product.id] = ratingData.averageRating;
        }
        setAvgRating(ratingsMap);
      } catch (err) {
        console.error("Failed to fetch rating stats", err);
      }
    };

    if (products.length > 0) {
      fetchRatings();
    }
  }, [products]);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await getCartItems(customerId);
      const cartProductIds = new Set(
        response.data.map((item) => item.productId)
      );
      setCartItems(
        (prevCartItems) => new Set([...prevCartItems, ...cartProductIds])
      );
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customerId]);

  const handleAddToCart = async (productId, price) => {
    if (!customerId) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await addToCart(customerId, productId, price);
      if (response.status === 200) {
        toast.success("Item added to cart!");
        fetchCartItems();
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoToCart = () => {
    navigate("/myCart");
  };

  const handleProduct = (productId) => {
    navigate("/customer/productPage", { state: { id: productId } });
  };

  return (
    <div className="container my-4">
      <div className="row">
        <aside className="col-md-2">
          <h5>Filters</h5>
          <div>
            {Object.keys(filters).map((key) => (
              <div key={key} className={`mb-3 ${styles.filterCard}`}>
                <h6>{key.toUpperCase()}</h6>
                {filters[key].map((value) => (
                  <div key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedFilters[key]?.includes(value) || false}
                      onChange={() => handleFilterChange(key, value)}
                    />{" "}
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="btn btn-primary me-2" onClick={applyFilters}>
            Apply
          </button>
          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear
          </button>
        </aside>

        <div className="col-md-10">
          <div className="d-flex align-items-center mb-3">
            <h5>Products ({products.length})</h5>
            <select
              className="form-select w-auto"
              value={sortBy}
              onChange={handleSort}
              style={{ marginLeft: "auto", marginRight: "20px" }}
            >
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="row">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div className="col-md-3 mb-3" key={product.id}>
                  <div className={`card ${styles.customCard}`}>
                    <div>
                      <img
                        src={product.primaryImage}
                        className={`card-img-top img-fluid ${styles.customImage}`}
                        alt={product.title}
                        onClick={() => handleProduct(product.id)}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">
                        {product.title.length > 18
                          ? `${product.title.substring(0, 18)}...`
                          : product.title}
                      </h6>
                      <div>
                        <span className="text-success">
                          <b>
                            ₹
                            {Math.round(
                              product.price -
                                (product.price * product.discount) / 100
                            )}
                          </b>
                        </span>{" "}
                        <span className="text-muted text-decoration-line-through">
                          <sub>₹{product.price}</sub>
                        </span>{" "}
                        <span className="text-danger">
                          {product.discount}% Off
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        ({avgRating[product.id] ?? "N/A"})
                        {Array.from({ length: maxStars }, (_, index) => (
                          <span key={index}>
                            {index < Math.floor(avgRating[product.id] || 0) ? (
                              <FaStar style={{ color: "#FFD700" }} />
                            ) : (
                              <FaRegStar style={{ color: "#FFD700" }} />
                            )}
                          </span>
                        ))}
                      </div>

                      {customerId &&
                        (cartItems.has(product.id) ? (
                          <button
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={handleGoToCart}
                          >
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-success mt-2"
                            onClick={() =>
                              handleAddToCart(
                                product.id,
                                Math.round(
                                  product.price -
                                    (product.price * product.discount) / 100
                                )
                              )
                            }
                          >
                            Add to Cart
                          </button>
                        ))}
                    </div>
                    <div className={styles.productInfo}></div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>

          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyProducts;
