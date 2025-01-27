import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import TopBar from "../components/TopBar"; // Import TopBar
import "./ViewOrders.css"; // Optional for specific styling

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      date: "2023-01-15",
      status: "Delivered",
      total: "₹4500.00",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2023-01-10",
      status: "Shipped",
      total: "₹3200.00",
    },
    {
      id: 3,
      customer: "Mark Johnson",
      date: "2023-01-05",
      status: "Processing",
      total: "₹1500.00",
    },
    {
      id: 4,
      customer: "Emily Brown",
      date: "2023-01-03",
      status: "Cancelled",
      total: "₹0.00",
    },
  ]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          position: "fixed",
          top: "0",
          bottom: "0",
          overflowY: "auto",
        }}
      >
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "250px",
            right: "0",
            height: "50px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <TopBar />
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginTop: "50px", // Space for the fixed top bar
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            Orders
          </h1>

          {/* Order Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Order ID</th>
                <th style={tableHeaderStyle}>Customer</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={rowStyle}>
                  <td style={cellStyle}>{order.id}</td>
                  <td style={cellStyle}>{order.customer}</td>
                  <td style={cellStyle}>{order.date}</td>
                  <td
                    style={{
                      ...cellStyle,
                      color:
                        order.status === "Delivered"
                          ? "#28a745"
                          : order.status === "Shipped"
                          ? "#ffc107"
                          : order.status === "Cancelled"
                          ? "#dc3545"
                          : "#007bff",
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={cellStyle}>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styling for table headers
const tableHeaderStyle = {
  textAlign: "left",
  padding: "12px",
  backgroundColor: "#135474",
  color: "#fff",
  fontWeight: "bold",
};

// Styling for table rows
const rowStyle = {
  borderBottom: "1px solid #ddd",
};

// Styling for table cells
const cellStyle = {
  padding: "12px",
};

export default Orders;