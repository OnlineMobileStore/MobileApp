// src/admin/components/SalesOverview.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SalesGraph from "./SalesGraph";

const SalesOverview = () => {
  const stats = [
    { label: "Sales", value: 59467, change: "+9%", bgColor: "#6C5CE7" },
    { label: "Returns", value: 28085, change: "-5%", bgColor: "#00CEC9" },
    { label: "Purchases", value: 39645, change: "-6%", bgColor: "#0984E3" },
    { label: "Downloads", value: 44148, change: "+13%", bgColor: "#2D3436" },
  ];

  const details = [
    { title: "Customers", value: 92556, change: "+1.35%", color: "#6C5CE7" },
    { title: "Conversion", value: 53812, change: "-0.17%", color: "#FDCB6E" },
    { title: "Revenue", value: 40008, change: "-0.06%", color: "#E17055" },
  ];

  const backgroundStyle = {
    backgroundColor: "#F5F7FA",
    minHeight: "100vh",
    padding: "20px",
  };

  const cardStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  });

  const detailCardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const chartPlaceholderStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundStyle}>
      <h1 className="mb-4" style={{ color: "#2D3436" }}>Dashboard</h1>

      {/* Top Stats */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3">
            <div style={cardStyle(stat.bgColor)}>
              <h5>{stat.label}</h5>
              <h3>{stat.value}</h3>
              <p>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="row mb-4">
        {details.map((detail, index) => (
          <div key={index} className="col-md-4">
            <div style={detailCardStyle}>
              <h5>{detail.title}</h5>
              <h3>{detail.value}</h3>
              <p style={{ color: detail.color }}>{detail.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Graph */}
      <div className="row">
        <div className="col-12">
        <div style={{ backgroundColor: "#F5F7FA", minHeight: "100vh", padding: "20px" }}>
        <h1 className="mb-4" style={{ color: "#2D3436" }}>Dashboard</h1>
        
        
        <div style={{height:'80%'}} className="col-12">
        <SalesGraph />
   
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
