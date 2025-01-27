import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AdminDashboard from "./admin/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./user/Dashboard";
import Sales from "./admin/Sales";
import Reviews from "./admin/Reviews";

// Import components for sidebar items
// import Sales from "./admin/Sales";
// import Orders from "./admin/Orders";
// import Reviews from "./admin/Reviews";
// import Products from "./admin/Products";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<h1>Welcome to Mobile Store</h1>} />

            {/* User Dashboard */}
            <Route path="/user/dashboard" element={<Dashboard />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sales"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Sales/>
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Orders />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Reviews />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/admin/products"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Products />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
     
      </Router>
    </AuthProvider>
  );
};

export default App;
