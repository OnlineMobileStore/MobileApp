import React from "react";
import styles from "../../styles/OrderTracking.module.css";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const OrderTracking = () => {
  const orderData = {
    deliveryAddress: {
      name: "Rahul Sharma",
      street: "22B, MG Road, Sector 15",
      district: "Gurgaon, Haryana - 122001",
      phone: "9876543210",
    },
    orderDetails: {
      productName: "Samsung Galaxy S23 Ultra",
      seller: "Mobile World",
      price: "₹124,999",
      offers: "1 Offer & 1 Coupon Applied",
      imageUrl:
        "https://image-us.samsung.com/us/smartphones/galaxy-s23/images/gallery/lavender/dm2/01-DM2-Lavender-PDP-1600x1200.jpg?$default-400-jpg$",
    },
    progress: [
      { label: "Order Confirmed", date: "Thu, 20th Apr", active: true },
      { label: "Shipped", date: "Sat, 22nd Apr", active: true },
      { label: "Out for Delivery", date: "Tue, 25th Apr", active: true },
      { label: "Delivered", date: "Tue, 25th Apr", active: true },
    ],
  };

  const { deliveryAddress, orderDetails, progress } = orderData;

  return (
    <div className={styles.container}>
      {/* Delivery Address */}
      <div className={styles.addressContainer}>
        <h3 className={styles.sectionTitle}>Delivery Address</h3>
        <div className={styles.address}>
          <p className={styles.bold}>{deliveryAddress.name}</p>
          <p>{deliveryAddress.street}</p>
          <p>{deliveryAddress.district}</p>
          <p>
            <span className={styles.bold}>Phone number:</span>{" "}
            {deliveryAddress.phone}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className={styles.orderContainer}>
        <div className={styles.productInfo}>
          <img
            src={orderDetails.imageUrl}
            alt={orderDetails.productName}
            className={styles.productImage}
          />
          <div>
            <h4 className={styles.bold}>{orderDetails.productName}</h4>
            <p>Seller: {orderDetails.seller}</p>
            <p className={styles.price}>{orderDetails.price}</p>
            <p className={styles.offers}>
              {orderDetails.offers} <span className={styles.tooltip}>?</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            {progress.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${styles.step} ${
                    step.active ? styles.active : ""
                  }`}
                >
                  <div className={styles.circle}></div>
                  <p className={styles.stepLabel}>{step.label}</p>
                  <span className={styles.stepDate}>{step.date}</span>
                </div>
                {index < progress.length - 1 && (
                  <div className={`${styles.line} ${styles.active}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <p className={styles.statusMessage}>Your item has been delivered</p>
      </div>
    </div>
  );
};

export default OrderTracking;
