import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For Bootstrap icons
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const TopBar = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfileChange = () => {
    navigate("/admin/change-profile");
  };

  const handleClearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      style={{
        position: "fixed",
        top: 0,
        left: "250px",
        right: 0,
        zIndex: 1030,
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between px-3">
        {/* Search Box */}
        <div
          className="input-group"
          style={{ maxWidth: "300px", width: "100%" }}
        >
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search"
            aria-label="Search"
          />
          <span className="input-group-text bg-transparent border-0 position-absolute end-0 pe-3">
            <i
              className="bi bi-search text-muted"
              style={{ cursor: "pointer" }}
            ></i>
          </span>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Settings Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="profile-dropdown"
              className="p-0 border-0"
            >
              <i className="bi bi-gear fs-5 text-secondary" role="button"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleProfileChange}>
                Change Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Notifications Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="p-0 border-0">
              <i className="bi bi-bell fs-5 text-secondary" role="button"></i>

              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                style={{ fontSize: "0.75rem" }}
              >
                {notifications.length}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {notifications.length > 0 ? (
                <>
                  {notifications.map((item, index) => (
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as="button"
                    onClick={handleClearNotifications}
                    className="text-center text-danger"
                  >
                    Clear All
                  </Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item className="text-muted">
                  No notifications
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
