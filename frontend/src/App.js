import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./admin/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./user/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
        <Route path="/" element={<h1>Welcome to Mobile Store</h1>} />
        <Route path="/user/dashboard" element={<Dashboard />} />
      </Routes>
          
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
