import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { signinCustomer } from '../../services/auth'
import styles from "./LoginCustomer.module.css";
import wallpaper from "../../assets/wallpaper.png";
import logo from "../../assets/logo.jpg";


const LoginCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  const onLogin = async(e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.warn("Please enter email");
      setError(true);
    } else if (password.length === 0) {
      toast.warn("Please enter password");
      setError(true);
    } else {
      const result = await signinCustomer(email, password)
      console.log("inside ")
      if (result['status'] === 'success') {
        toast.success("Welcome to Mobile Store")

        const { firstName, lastName, phone,email,id} = result.data
        const { token} = result
        localStorage['name'] = `${firstName} ${lastName}`
        localStorage['customerId'] = id
        localStorage['token'] = token
        localStorage['phone'] = phone
        localStorage.setItem('email', email)

        navigate('/')
      } else {
        toast.error("Incorrect creadentials")
      }

    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        <img src={wallpaper} alt="Mobile Store Wallpaper" className={styles.loginImage} />
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
          <p className={styles.subtitle}>Sign in as Customer</p>
          <form onSubmit={onLogin}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.formControl} ${error && !email ? styles.error : ""}`}
                placeholder="Enter email here.."
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.formControl} ${error && !password ? styles.error : ""}`}
                placeholder="Password"
              />
            </div>
            <p>Don't have account already? <Link to='/register-customer'>SigUP here</Link></p>
            <button type="submit" className={`btn btn-primary btn-block ${styles.btn}`}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
