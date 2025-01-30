import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminDashboard from "./pages/admin/DashboardAdmin";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SalesDetailsAdmin from "./pages/admin/SalesDetailsAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import OrderChangeAdmin from "./pages/admin/OrderChangeAdmin";
import HomeCustomer from "./pages/customer/HomeCustomer";
import CustomersDetails from './pages/admin/CustomersDetails';
import Wishlist from './pages/customer/Wishlist';
import MyCart from './pages/customer/MyCart';
import ProductPage from './pages/customer/ProductPage';
import ProductReview from './pages/customer/ProductReview';
import CheckOut from "./pages/customer/CheckOut";
import OrderTracking from "./pages/customer/OrderTracking";

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
                  <SalesDetailsAdmin/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <OrderChangeAdmin/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ReviewsAdmin/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                 < CustomersDetails/>
                </ProtectedRoute>
              }
            />

            <Route path='/Customer/home' element={<HomeCustomer />} />
            <Route path='/wishlist' element={<Wishlist/>} />
            <Route path='/mycart' element={<MyCart/>} />
            <Route path='/checkout' element={<CheckOut/>}/>
            <Route path="/ordertracking" element={<OrderTracking />} />
            <Route path='/productreviews' element={<ProductReview/>} />
            <Route path='/productpage' element={<ProductPage/>} />
          
          </Routes>
        </div>
     
      </Router>
    </AuthProvider>
  );
};

export default App;
