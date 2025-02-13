import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/CheckOut.module.css";
import Navbar from "../../components/Navbar";
import { getCustomerDetails } from "../../services/customer";
import { toast } from "react-toastify";
import { placeOrder } from "../../services/order";
import { emptyCart } from "../../services/cart";
import OTPVerification from "../../components/OTPVerification";
import { motion } from "framer-motion";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderPrice = location.state?.orderPrice || 0;
  const cartItems = location.state?.cartItems;

  const successAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit",
  });

  const [errors, setErrors] = useState({});

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await getCustomerDetails(customerId);
        setFormData(response.data);
      } catch (error) {
        toast.error("Failed to fetch customer details");
      }
    };
    fetchCustomerDetails();
  }, [customerId]);

  const validateStep1 = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email) tempErrors.email = "email is required";
    if (!formData.phone) tempErrors.phone = "mobile is required";
    if (
      !formData.addressLine ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.country
    ) {
      tempErrors.address = "Address is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customerId: customerId,
      paymentMethod: formData.paymentMethod,
      orderItems: cartItems,
    };
    try {
      const response = await placeOrder(orderData);
      if (response.data.status === "success") {
        toast.success("order placed successfully!");

        let notifications =
          JSON.parse(localStorage.getItem("notifications")) || [];
        notifications.push("order placed! by customer:" + customerId);

        localStorage.setItem("notifications", JSON.stringify(notifications));

        await emptyCart(customerId);
        handleNext();
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.modal}>
        <center>
          <h3>Checkout</h3>
        </center>
        <div className={styles.progress}>
          <span className={step >= 1 ? styles.active : ""}>1</span>
          <span className={step >= 2 ? styles.active : ""}>2</span>
          <span className={step >= 3 ? styles.active : ""}>3</span>
          <span className={step === 4 ? styles.active : ""}>4</span>
        </div>

        {step === 1 && (
          <div className={styles.step}>
            <h5>Personal Details</h5>
            <div style={{ display: "flex", gap: "20px" }}>
              <div className={styles.inputContainer}>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.inputContainer}>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div className={styles.inputContainer}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.inputContainer}>
                <label>Mobile</label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                {errors.mobile && (
                  <span className={styles.error}>{errors.mobile}</span>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label>Address</label>
              <textarea
                placeholder="Enter your delivery address"
                value={`${formData.addressLine}, ${formData.city}, ${formData.state}, ${formData.postalCode}, ${formData.country}`}
                onChange={(e) => {
                  const [addressLine, city, state, postalCode, country] =
                    e.target.value.split(",");
                  setFormData({
                    ...formData,
                    addressLine: addressLine?.trim(),
                    city: city?.trim(),
                    state: state?.trim(),
                    postalCode: postalCode?.trim(),
                    country: country?.trim(),
                  });
                }}
              />
              {errors.address && (
                <span className={styles.error}>{errors.address}</span>
              )}
            </div>

            <div style={{ display: "flex", gap: "100px", marginTop: "10px" }}>
              <button
                className={styles.nextbutton}
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button className={styles.nextbutton} onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={styles.step}>
              <h6>Select Payment Method</h6>
              <div style={{ width: "40%" }}>
                <label style={{ marginTop: "20px" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === "credit"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />{" "}
                  💳 Credit/Debit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="phonePay"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />{" "}
                  💲 PhonePay
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />{" "}
                  🏦 Cash On Delivery
                </label>

                <h3 style={{ marginTop: "25px" }}>Total: ₹{orderPrice}</h3>
              </div>
              <div style={{ display: "flex", gap: "100px", marginTop: "10px" }}>
                <button className={styles.nextbutton} onClick={handleBack}>
                  Back
                </button>
                <button className={styles.nextbutton} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.success}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <OTPVerification email={formData.email} />
              </div>
              <div style={{ display: "flex", gap: "100px", marginTop: "15px" }}>
                <button className={styles.nextbutton} onClick={handleBack}>
                  Back
                </button>
                <button
                  className={styles.nextbutton}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <motion.div
            className={styles.success}
            initial="hidden"
            animate="visible"
            variants={successAnimation}
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🎉 Order Successful! 🎉
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Thank you for your order.
            </motion.p>
            <motion.button
              className={styles.trackbutton}
              onClick={() => navigate("/order-tracking")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Track Your Order 🚚
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
