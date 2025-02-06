import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductById, getProductImages } from "../../services/product";
import { toast } from "react-toastify";
import styles from "./ProductDetails.module.css";
import ProductAverage from "../../components/ProductAverage";

const ProductDetails = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
    <div className={styles.container}>
      {/* Image Gallery Section */}
      <div className={styles.imageGallery}>
        <img className={styles.mainImage} 
        // src={selectedImage} 
        src="https://m.media-amazon.com/images/I/51TOrXHNuIL._SX679_.jpg"
        alt={product.title} />
        <div className={styles.thumbnailContainer}>
          {productImages.map((img, index) => (
            <img
              key={index}
              className={styles.thumbnail}
              // src={img}
              src="https://m.media-amazon.com/images/I/61p1GDl3JPL._SX679_.jpg"
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Information Section */}
      <div className={styles.productInfo}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.brand}>Brand: {product.brand_name || "N/A"}</p>
        <p className={styles.description}>{product.description}</p>

        {/* Product Specifications */}
        <div className={styles.specs}>
          <p className={styles.price}>
            ₹{product.price} <span className={styles.discount}>({product.discount}% Off)</span>
          </p>
          <p>Color: {product.color}</p>
          <p>RAM: {product.ram} GB</p>
          <p>Storage: {product.storage} GB</p>
          <p>Camera: {product.camera} MP</p>
          <p>Screen Size: {product.screenSize} inch</p>
          <p>OS: {product.os}</p>
          <p>Battery: {product.battery} mAh</p>
          <p>Quantity: {product.quantity}</p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.buyNow}`}>Buy Now</button>
          <button className={`${styles.button} ${styles.addToCart}`}>Add to Cart</button>
        </div>
      </div>
    </div>
    <ProductAverage id={id}/>
    </>
  );
};

export default ProductDetails;
