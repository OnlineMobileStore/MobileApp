import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const products = [
    { id: 1, name: "Mobile A", price: "$300", image: "/images/mobile-a.jpg" },
    { id: 2, name: "Mobile B", price: "$400", image: "/images/mobile-b.jpg" },
    { id: 3, name: "Mobile C", price: "$500", image: "/images/mobile-c.jpg" },
  ];

  return (
    <div >
      <h1>Home</h1>
    </div>
  );
};

export default Home;
