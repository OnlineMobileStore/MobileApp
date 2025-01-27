import React from "react";
import "./Dashboard.css";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const mobiles = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "$999",
      image: "https://via.placeholder.com/300x300.png?text=iPhone+14+Pro",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      price: "$899",
      image: "https://via.placeholder.com/300x300.png?text=Samsung+Galaxy+S23",
    },
    {
      id: 3,
      name: "Google Pixel 7",
      price: "$699",
      image: "https://via.placeholder.com/300x300.png?text=Google+Pixel+7",
    },
  ];

  return (
    <div >
      <NavbarComponent/>
      <div>
      User Dasshboard
      </div>
      <Footer/></div>
   
  );
};

export default Dashboard;
