import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfile} from '../../services/admin'
import { getAdminDetails} from '../../services/admin'

const ChangeAdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await editProfile(adminId, adminDetails);
      if (result["status"] === "success") {
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

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  return (
    <div className="change-profile-container">
      <h2>Change Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={adminDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={adminDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={adminDetails.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={adminDetails.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ChangeAdminProfile;
