import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For Bootstrap icons

const TopBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      style={{ position: "fixed", top: 0, left: "250px", right: 0, zIndex: 1030 }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between px-3">
        {/* Search Box */}
        <div className="input-group" style={{ maxWidth: "300px", width: "100%" }}>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search"
            aria-label="Search"
            style={{ paddingRight: "40px" }}
          />
          <span
            className="position-absolute end-0 pe-3 text-muted"
            style={{ top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
          >
            <i className="bi bi-search"></i>
          </span>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Settings Icon */}
          <i className="bi bi-gear fs-5 text-secondary" role="button"></i>

         

          {/* Notifications */}
          <div className="position-relative">
            <i className="bi bi-bell fs-5 text-secondary" role="button"></i>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{ fontSize: "0.75rem" }}
            >
              5
            </span>
         
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
