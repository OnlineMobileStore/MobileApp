import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import TopBar from "../components/TopBar"; // Import TopBar
import styles from "../styles/ViewOrders.module.css";

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
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <TopBar />
        </div>

        {/* Scrollable Content */}
        <div className={styles.scrollableContent}>
          <h1 className={styles.pageTitle}>Orders</h1>

          {/* Order Table */}
          <table className={styles.orderTable}>
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
