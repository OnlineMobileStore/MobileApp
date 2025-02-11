import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfile, getCustomerDetails } from "../../services/customer";
import "bootstrap/dist/css/bootstrap.min.css";

const ChangeProfile = () => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await getCustomerDetails(customerId);
        setCustomerDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch customer details");
      }
    };
    fetchCustomerDetails();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await editProfile(customerId, customerDetails);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        navigate("/");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  return (
    <div className="container mt-2 d-flex justify-content-center align-items-center">
      <div className="card shadow ps-4 pt-2 pb-2 pe-4 w-50">
        <h3 className="text-center mb-3">Change Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={customerDetails.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={customerDetails.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={customerDetails.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address Line</label>
            <input
              type="text"
              className="form-control"
              name="addressLine"
              value={customerDetails.addressLine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={customerDetails.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={customerDetails.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                name="postalCode"
                value={customerDetails.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={customerDetails.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
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

export default ChangeProfile;
