import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/RegisterCustomer.module.css";
import wallpaper from "../../assets/wallpaper.png";
import logo from "../../assets/logo.jpg";
import { signup } from "../../services/auth";

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      toast.warn("Please fill all fields");
      setError(true);
    } else {
      const result = await signup(formData);
      if (result["status"] === "success") {
        toast.success("Successfully registered a new admin");
        navigate('/');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageSection}>
        <img
          src={wallpaper}
          alt="Mobile Store Wallpaper"
          className={styles.registerImage}
        />
      </div>

      <div className={styles.formSection}>
        <div className={styles.registerForm}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <h1 className={styles.welcomeText}>Welcome to Mobile Store</h1>
          <p className={styles.subtitle}>Sign up as Customer</p>
          <form onSubmit={onRegister}>
            <div style={{ display: "flex",gap:"3%" }}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.firstName ? styles.error : ""
                  }`}
                  placeholder="First Name"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.lastName ? styles.error : ""
                  }`}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  error && !formData.email ? styles.error : ""
                }`}
                placeholder="Email"
              />
            </div>
            <div style={{ display: "flex",gap:"3%" }}>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.password ? styles.error : ""
                  }`}
                  placeholder="Password"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.phone ? styles.error : ""
                  }`}
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  error && !formData.addressLine ? styles.error : ""
                }`}
                placeholder="Address"
              />
            </div>
            <div style={{ display: "flex" ,gap:"3%"}}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.city ? styles.error : ""
                  }`}
                  placeholder="City"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.state ? styles.error : ""
                  }`}
                  placeholder="State"
                />
              </div>
            </div>
            <div style={{ display: "flex",gap:"3%" }}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.postalCode ? styles.error : ""
                  }`}
                  placeholder="postalCode code"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`${styles.formControl} ${
                    error && !formData.country ? styles.error : ""
                  }`}
                  placeholder="Country"
                />
              </div>
            </div>
            <p>
              Already have an account? <Link to="/">Signin here</Link>
            </p>
            <button
              type="submit"
              className={`btn btn-primary btn-block ${styles.btn}`}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
