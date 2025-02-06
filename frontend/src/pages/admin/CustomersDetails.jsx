import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar";
import { getAllCustomers } from "../../services/customer";
import { toggleCustomer } from "../../services/customer";

const CustomersDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        if (response.status != 200) {
          throw new Error("Failed to fetch customers");
        }
        // const data = await response.json();
        setCustomers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleBlockUnblock = async (id) => {
    try {
      const customer = customers.find((c) => c.id === id);
      if (!customer) return;

      const updatedStatus = !customer.isActive;
      setCustomers(customers.map((c) =>
          c.id === id ? { ...c, isActive: updatedStatus } : c
        ));

      await toggleCustomer(id, updatedStatus);
    } catch (error) {
      console.error("Failed to update block status:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
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
            marginTop: "50px",
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h1 style={{fontSize: "24px",fontWeight: "bold",marginBottom: "20px",}}>
            Customer List
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
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
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Total Amount Spent</th>
                  <th style={tableHeaderStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} style={rowStyle}>
                    <td style={cellStyle}>{customer.firstName} {customer.lastName}</td>
                    <td style={cellStyle}>{customer.email}</td>
                    <td style={cellStyle}>{customer.totalSpent}</td>
                    <td style={cellStyle}>
                      <button
                        onClick={() => handleBlockUnblock(customer.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: customer.isActive? "#dc3545": "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {customer.isActive ? "Block" : "UnBlock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

export default CustomersDetails;
