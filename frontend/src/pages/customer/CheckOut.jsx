import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/CheckOut.module.css";
import Navbar from '../../components/Navbar';
import '../../components/Footer.css';
import '../../components/Navbar.css';

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderPrice = location.state?.orderPrice || 0; // Get order price from navigation state

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    paymentMethod: "credit",
    cardNumber: "",
    expiry: "",
    cvv: "",
    holderName: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Valid email is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      tempErrors.mobile = "Valid 10-digit mobile number required";
    if (!formData.address) tempErrors.address = "Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    let tempErrors = {};
    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber))
        tempErrors.cardNumber = "Valid 16-digit card number required";
      if (!formData.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry))
        tempErrors.expiry = "Valid expiry date (MM/YY) required";
      if (!formData.cvv || !/^\d{3}$/.test(formData.cvv))
        tempErrors.cvv = "Valid 3-digit CVV required";
      if (!formData.holderName) tempErrors.holderName = "Card holder name required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {orderPrice}
      <div className={styles.modal}>
        <h2>Make Payment</h2>
        <div className={styles.progress}>
          <span className={step >= 1 ? styles.active : ""}>1</span>
          <span className={step >= 2 ? styles.active : ""}>2</span>
          <span className={step === 3 ? styles.active : ""}>3</span>
        </div>

        {step === 1 && (
          <div className={styles.step}>
            <h3>Personal Details</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
              <input
                type="text"
                placeholder="Mobile Phone"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {errors.mobile && <span className={styles.error}>{errors.mobile}</span>}
            </div>
            <textarea
              placeholder="Address for Delivery"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {errors.address && <span className={styles.error}>{errors.address}</span>}

            <h3>Select Payment Method</h3>
            <div className={styles.paymentMethods}>
              <label className={formData.paymentMethod === "credit" ? styles.selected : ""}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === "credit"}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                💳 Credit/Debit Card
              </label>
              <label className={formData.paymentMethod === "paypal" ? styles.selected : ""}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                💲 PayPal
              </label>
              <label className={formData.paymentMethod === "bank" ? styles.selected : ""}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                🏦 Bank Transfer
              </label>
            </div>

            <button className={styles.button} onClick={handleNext}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h3>Payment Details</h3>
            {formData.paymentMethod === "credit" && (
              <>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
                {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                />
                {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
              </>
            )}
            <button className={styles.button} onClick={handleBack}>Back</button>
            <button className={styles.button} onClick={handleNext}>Confirm</button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.success}>
            <h3>Order Summary</h3>
            <p>Order Price: ₹{orderPrice}</p>
            <button className={styles.button} onClick={handleConfirm}>Complete Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
