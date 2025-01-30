import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./LoginAdmin.module.css";
import wallpaper from "../../assets/wallpaper.png";
import logo from "../../assets/logo.jpg";
import { signinAdmin } from "../../services/auth";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  const onLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.warn("Please enter email");
      setError(true);
    } else if (password.length === 0) {
      toast.warn("Please enter password");
      setError(true);
    } else {
      const result = await signinAdmin(email, password);
      if (result["status"] === "success") {
        toast.success("Welcome to Mobile Store");

        const { firstName, lastName, phone,email,id} = result.data
        const { token} = result
        localStorage['name'] = `${firstName} ${lastName}`
        localStorage['adminId'] = id
        localStorage['token'] = token
        localStorage['phone'] = phone
        localStorage.setItem('email', email)


        navigate("/admin/dashboard");
      } else {
        toast.error(result["error"]);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        <img
          src={wallpaper}
          alt="Mobile Store Wallpaper"
          className={styles.loginImage}
        />
      </div>

      <div className={styles.formSection}>
        <div className="d-flex justify-content-center gap-3 p-3">
          <button
            onClick={() => handleClick("/")}
            className={styles.customerbtn}
          >
            Customer
          </button>
          <button
            onClick={() => handleClick("/login-admin")}
            className={styles.adminbtn}
          >
            Admin
          </button>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <h1 className={styles.welcomeText}>Welcome to Mobile Store</h1>
          <p className={styles.subtitle}>Sign in as Admin</p>
          <form onSubmit={onLogin}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.formControl} ${
                  error && !email ? styles.error : ""
                }`}
                placeholder="Enter email here.."
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.formControl} ${
                  error && !password ? styles.error : ""
                }`}
                placeholder="Password"
              />
            </div>
            <p style={{ visibility: "hidden" }}>admin</p>
            <button
              type="submit"
              className={`btn btn-primary btn-block ${styles.btn}`}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
