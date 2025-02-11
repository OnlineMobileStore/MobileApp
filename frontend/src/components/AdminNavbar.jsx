import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation(); // Get current path to set the active state
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Sales", path: "/admin/sales" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Customers", path: "/admin/customers" },
    { name: "FAQs", path: "/admin/faq" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          padding: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "20px",color:"white" }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {navItems.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "10px 0",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor:
                    activeItem === item.path ? "#ffffff22" : "transparent",
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <Link
                  to={item.path}
                  style={{
                    color: activeItem === item.path ? "#ffd700" : "#fff", // Active item is gold, others are white
                    textDecoration: "none",
                    fontWeight: activeItem === item.path ? "bold" : "normal",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px", // Push content to the right of the sidebar
          flex: 1,
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
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
