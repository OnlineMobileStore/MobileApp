import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SalesDetailsAdmin from "./pages/admin/SalesDetailsAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import OrderChangeAdmin from "./pages/admin/OrderChangeAdmin";
import HomeCustomer from "./pages/customer/HomeCustomer";
import CustomersDetails from './pages/admin/CustomersDetails';
import Wishlist from './pages/customer/Wishlist';
import MyCart from './pages/customer/MyCart';
import ProductPage from './pages/customer/ProductPage';
import AddReview from './pages/customer/AddReview';
import LoginCustomer from "./pages/customer/LoginCustomer";
import RegisterCustomer from "./pages/customer/RegisterCustomer";
import LoginAdmin from "./pages/admin/LoginAdmin";
import { ToastContainer } from "react-toastify";
import ChangeProfile from "./pages/customer/ChangeProfile";
import ChangeAdminProfile from "./pages/admin/ChangeAdminProfile";
import AverageReview from "./components/AverageReview";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import DeleteProduct from "./pages/admin/DeleteProduct";
import ProductDetails from "./pages/admin/ProductDetails";
import AddBrand from "./pages/admin/AddBrand";
import CheckOut from "./pages/customer/CheckOut";
import OrderTracking from "./pages/customer/OrderTracking";

import FAQ from "./pages/customer/FAQ";
import FAQAdmin from "./pages/admin/FAQAdmin";


const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="content">
          <Routes>
            <Route path="/login-customer" element={<LoginCustomer />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-customer" element={<RegisterCustomer />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/admin/sales" element={<SalesDetailsAdmin />} />
            <Route path="/admin/orders" element={<OrderChangeAdmin />} />
            <Route path="/admin/reviews" element={<ReviewsAdmin />}/>
            <Route path="/admin/customers" element={< CustomersDetails />}/>
            <Route path='/' element={<HomeCustomer />} />
            <Route path='/customer/change-profile' element={<ChangeProfile />} />
            <Route path='/admin/change-profile' element={<ChangeAdminProfile />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/mycart' element={<MyCart />} />
            <Route path='/add-review' element={<AddReview />} />
            <Route path='/customer/productPage' element={<ProductPage />} />
            <Route path='/productAverage' element={<AverageReview />} />
            <Route path='/add-brand' element={<AddBrand />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/edit-product' element={<EditProduct />} />
            <Route path='/delete-product' element={<DeleteProduct />} />
            <Route path='/product-details' element={<ProductDetails />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/order-tracking' element={<OrderTracking />} />

    <Route path='/customer/faq' element={<FAQ />} />
            <Route path='/admin/faq' element={<FAQAdmin />} />

          </Routes>
        </div>

      </Router>
      <ToastContainer />
     </CartProvider>
  );
};

export default App;
