import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfile, getAdminDetails } from "../../services/admin";
import "bootstrap/dist/css/bootstrap.min.css";

const ChangeAdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const adminId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await getAdminDetails(adminId);
        setAdminDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch admin details");
      }
    };

    fetchAdminDetails();
  }, [adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await editProfile(adminId, adminDetails);
      if (result.data["status"] === "success") {
        toast.success("Profile updated successfully!");
        navigate("/admin/dashboard");
      } else {
        toast.error(result["error"]);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-50">
        <h3 className="text-center mb-3">Change Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="col-md-12 mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={adminDetails.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={adminDetails.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={adminDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={adminDetails.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn btn-success px-4 me-2"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAdminProfile;
