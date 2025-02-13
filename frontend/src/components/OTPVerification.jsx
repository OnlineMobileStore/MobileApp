import React, { useState } from "react";
import { sendOTP, verifyOTP } from "../services/otpverification";

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await sendOTP(email);
      setMessage(response.data.message);
    } catch (err) {
      setError("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await verifyOTP(email, otp);
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3 style={{ marginBottom: "15px" }}>Verify OTP</h3>

      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "7px 10px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "10px",
          transition: "0.3s",
        }}
        onClick={sendOtp}
      >
        Send OTP
      </button>

      <br />

      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        maxLength="6"
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "80%",
          maxWidth: "250px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      />

      <br />

      <button
        style={{
          backgroundColor: "#135474",
          color: "white",
          padding: "7px 10px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "0.3s",
        }}
        onClick={verifyOtp}
      >
        Verify OTP
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
      )}
    </div>
  );
};

export default OTPVerification;
