import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [activeItem, setActiveItem] = useState("/admin/dashboard");

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          padding: "20px",
          position: "fixed", // Fix sidebar to the left
          top: 0,
          left: 0,
          height: "100vh", // Full height
          overflowY: "auto", // Enable vertical scrolling for the sidebar
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {["Dashboard", "Sales", "Orders", "Reviews", "Customers"].map(
              (item, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px 0",
                    cursor: "pointer",
                    backgroundColor:
                      activeItem === `/admin/${item.toLowerCase()}`
                        ? "#ffffff22"
                        : "transparent",
                    borderRadius: "5px",
                  }}
                  onClick={() =>
                    handleItemClick(`/admin/${item.toLowerCase()}`)
                  }
                >
                  <Link
                    to={`/admin/${item.toLowerCase()}`}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight:
                        activeItem === `/admin/${item.toLowerCase()}`
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px", // Push content to the right of the sidebar
          flex: 1,
          backgroundColor: "#f5f5f5",
          overflowY: "auto", // Enable scrolling for content
        }}
      >
        <header
          style={{
            height: "70px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
            }}
          />
        </header>
        <div style={{ padding: "20px" }}>
          <h1>Dynamic Content Goes Here</h1>
          <p>
            This is your admin dashboard. Use the sidebar to navigate through
            different sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
