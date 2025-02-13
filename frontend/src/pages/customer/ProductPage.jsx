import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductById, getProductImages } from "../../services/product";
import { addToCart, getCartItems } from "../../services/cart";
import { addToWishlist, getWishlist } from "../../services/wishlist";
import { toast } from "react-toastify";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "../../styles/ProductPage.module.css";
import AverageReview from "../../components/AverageReview";
import ReviewByCustomers from "../../components/ReviewByCustomers";
import NavbarComponent from "../../components/Navbar";

const ProductPage = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        const imageResult = await getProductImages(id);
        if (response.status === 200) {
          setProduct(response.data);
          setProductImages(imageResult);
          setSelectedImage(response.data.primaryImage || imageResult[0]);
        } else {
          toast.error("Failed to load product details");
        }
      } catch (error) {
        toast.error("Error fetching product details");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const fetchWishlistItems = async () => {
    if (!customerId) return;
    try {
      const response = await getWishlist(customerId);
      setWishlist(response);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await getCartItems(customerId);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleAddToCart = async (productId, price) => {
    if (!customerId) return;
    try {
      await addToCart(customerId, productId, price); // Replace with your actual service function
      toast.success("Added to cart");
      fetchCartItems(); // Refresh cart
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!customerId) return;
    try {
      await addToWishlist(customerId, productId); // Replace with your actual service function
      toast.success("Added to wishlist");
      fetchWishlistItems(); // Refresh wishlist
    } catch (error) {
      toast.error("Error adding to wishlist");
    }
  };
  useEffect(() => {
    fetchCartItems(); // Fetch cart items
  }, []);

  useEffect(() => {
    fetchWishlistItems(); // Fetch wishlist items
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <NavbarComponent />
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>

        {/* Image Gallery */}
        <div className={styles.imageGallery}>
          <div>
            <img
              className={styles.mainImage}
              src={selectedImage}
              alt={product.title}
            />
          </div>
          <div className={styles.thumbnailContainer}>
            {productImages.length > 0 ? (
              productImages.map((img, index) => (
                <img
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === img ? styles.activeThumbnail : ""
                  }`}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))
            ) : (
              <p>No additional images</p>
            )}
          </div>
        </div>

        {/* Icons */}

        {customerId && (
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {/* Cart Button */}
            <div>
              {cart &&
              cart.length > 0 &&
              cart.some((item) => item.productId === product.id) ? (
                <button className="btn btn-success" disabled>
                  <FaShoppingCart />
                </button>
              ) : (
                <button
                  className="btn btn-outline-success"
                  onClick={() =>
                    handleAddToCart(
                      product.id,
                      product.price - (product.price * product.discount) / 100
                    )
                  }
                >
                  <FaShoppingCart />
                </button>
              )}
            </div>
            <div>
              {/* Wishlist Button */}
              {wishlist &&
              wishlist.length > 0 &&
              wishlist.some((item) => item.productId === product.id) ? (
                <button className="btn btn-danger me-2" disabled>
                  <FaHeart />
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => handleAddToWishlist(product.id)}
                >
                  <FaHeart />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Product Info */}
        <div className={styles.productInfo}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.brand}>Brand: {product.brand_name || "N/A"}</p>

          <div className={styles.specs}>
            <p>
              <span className="text-success">
                <b>
                  ₹
                  {Math.round(
                    product.price - (product.price * product.discount) / 100
                  )}
                </b>
              </span>{" "}
              <span className="text-muted text-decoration-line-through">
                <sub>₹{product.price}</sub>
              </span>{" "}
              <span className="text-danger">{product.discount}% Off</span>
            </p>
            <p>Color: {product.color}</p>
            <p>RAM: {product.ram} GB</p>
            <p>Storage: {product.storage} GB</p>
            <p>Camera: {product.camera} MP</p>
            <p>Screen Size: {product.screenSize} inch</p>
            <p>OS: {product.os}</p>
            <p>Battery: {product.battery} mAh</p>

            <div
              className={
                product.quantity > 0
                  ? "text-success fw-bold"
                  : "text-danger fw-bold"
              }
            >
              {product.quantity > 0 ? "In stock" : "Out of stock"}
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ display: "flex", marginLeft: "30px" }}>
        <div>
          <AverageReview id={id} />
        </div>
        <div style={{ width: "60%" }}>
          <ReviewByCustomers productId={id} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
