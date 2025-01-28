import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HomeCustomer.module.css"; // Modular CSS import
import { Carousel } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureCard from "../../components/FeatureCard";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import PostQn from "../../components/PostQn";
import BuyProducts from "../../components/BuyProducts";

const newProducts = [
  {
    id: 1,
    name: "FS - QUILTED MAXI CROSS BAG",
    price: 299.43,
    originalPrice: 534.33,
    discount: 24,
    image:
      "https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 2,
    name: "FS - Nike Air Max 270 React",
    price: 299.43,
    originalPrice: 534.33,
    discount: 24,
    image:
      "https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 3,
    name: "FS - Nike Air Max 270 React",
    price: 299.43,
    originalPrice: 534.33,
    discount: 24,
    image:
      "https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UL480_FMwebp_QL65_.jpg",
  },
];

const HomeCustomer = () => {
  const [favorites, setFavorites] = useState(
    newProducts.reduce((acc, product) => {
      acc[product.id] = false;
      return acc;
    }, {})
  );

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
          <div className={styles.latestHead}><h2>Latest Lonch</h2></div>
            <div className="row">
              {newProducts.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className={styles.productCard}>
                    <div style={{display:"flex"}}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`img-fluid ${styles.productImage}`}
                    />
                    {/* Icons */}
                    <div className={styles.productActions}>
                      <button
                        className="btn btn-outline-danger me-2"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        {favorites[product.id] ? (
                          <FaHeart className="text-danger" />
                        ) : (
                          <FaHeart style={{color:"#d1deeb"}}/>
                        )}
                        
                      </button>
                      <button className="btn btn-outline-success">
                        <FaShoppingCart /> 
                      </button>
                    </div>
                    </div>
                    <div className={styles.productInfo}>
                      <h5>
                        {product.name.length > 25
                          ? `${product.name.substring(0, 25)}...`
                          : product.name}
                      </h5>
                      <p>
                        <span className="text-muted text-decoration-line-through">
                          ₹{product.price}
                        </span>{" "}
                        <span className="text-danger">
                          {product.discount}% Off
                        </span>
                      </p>
                      <h4 className="text-primary">₹ {Math.round(product.price-(product.price*product.discount/100))}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      <div style={{height:"250px"}}></div>
      <BuyProducts/>
      <FeatureCard/>
      <PostQn/>
      <Footer/>
    </div>
  );
};

export default HomeCustomer;
