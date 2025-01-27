import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarComponent from './../components/Navbar';

const AdminDashboard = () => {
  return (
    <div>
      <NavbarComponent/>
      <div>
      Admin dashboard
      </div>
      <Footer/></div>
     
  );
};

export default AdminDashboard;
