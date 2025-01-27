import React from "react";
import { useAuth } from "../auth/AuthContext";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { auth } = useAuth();

  return (
    <div ><NavbarComponent/>
      <h1>Wishlist user</h1>
      <Footer/>
    </div>
  );
};

export default Wishlist;
