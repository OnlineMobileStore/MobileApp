import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    login(username, password);

    // Redirect based on user role after successful login
    if (auth.isAuthenticated) {
      if (auth.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/home");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSignIn}
          >
            Log In
          </button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
