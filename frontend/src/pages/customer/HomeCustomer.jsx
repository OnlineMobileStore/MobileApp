import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HomeCustomer.module.css"; // Modular CSS import
import { Carousel } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureCard from "../../components/FeatureCard";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import PostQn from "../../components/PostQn";
import BuyProducts from "../../components/BuyProducts";
import { getAllProducts } from "../../services/product";
import { getLatestProducts } from "../../services/product";

const HomeCustomer = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const result = await getLatestProducts();
        setNewProducts(result.data);
        console.log(result.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchLatest();
  }, []);

  const [favorites, setFavorites] =
    useState();
    newProducts.reduce((acc, product) => {
      acc[product.id] = false;
      return acc;
    }, {})
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <div className={styles.homepage}>
      <Navbar />
      <div className={styles.carouselWrapper}>
        <Carousel>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg"
              alt="First slide"
            />
            <Carousel.Caption className={styles.leftCaption}>
              <h3>Super Flash Sale</h3>
              <p>50% Off</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src="https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_unrec_refresh._CB555261616_.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className={styles.leftCaption}>
              <h3>Exclusive Collection</h3>
              <p>Grab the Best Deals!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className={styles.newProductSection}>
          {/* <div className={styles.latestHead}><h2>Latest Lonch</h2></div> */}
          <div className="container">
            <div className={styles.latestHead}>
              <h2>Latest Lonch</h2>
            </div>
            <div className="row">
              {newProducts && newProducts.length > 0 ? (
                newProducts.map((newproduct) => (
                  <div className="col-md-4" key={newproduct.id}>
                    <div className={styles.productCard}>
                      <div style={{ display: "flex" }}>
                        <img
                          src={newproduct.primaryImage}
                          alt={newproduct.title}
                          className={`img-fluid ${styles.productImage}`}
                        />
                        {/* Icons */}
                        <div className={styles.productActions}>
                          <button className="btn btn-outline-danger me-2"
                           onClick={() => toggleFavorite(newproduct.id)}
                          >
                            {favorites?.[newproduct.id] ? (
                              <FaHeart className="text-danger" />
                            ) : (
                              <FaHeart style={{ color: "#d1deeb" }} />
                            )}
                          </button>
                          <button className="btn btn-outline-success">
                            <FaShoppingCart />
                          </button>
                        </div>
                      </div>
                      <div className={styles.productInfo}>
                        <h5>
                          {newproduct.title?.length > 25
                            ? `${newproduct.title.substring(0, 25)}...`
                            : newproduct.title}
                        </h5>
                        <p>
                          <span className="text-muted text-decoration-line-through">
                            ₹{newproduct.price}
                          </span>{" "}
                          <span className="text-danger">
                            {newproduct.discount}% Off
                          </span>
                        </p>
                        <h4 className="text-primary">
                          ₹{" "}
                          {Math.round(
                            newproduct.price -
                              (newproduct.price * newproduct.discount) / 100
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No new products available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "250px" }}></div>
      <BuyProducts products={products} />
      <FeatureCard />
      <PostQn />
      <Footer />
    </div>
  );
};

export default HomeCustomer;
