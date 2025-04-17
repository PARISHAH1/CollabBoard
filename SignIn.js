import React, { useState } from "react";
import "../App.css";

const SignIn = ({ onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState(""); // Replacing password with ID

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation: Retrieve stored/generated ID (e.g., from localStorage)
    const storedId = localStorage.getItem("generatedId"); // Assuming ID is saved during signup

    if (email === "test@gmail.com" && id === storedId) {
      alert("Login successful!");
      onClose(); // Close popup after successful login
    } else {
      alert("Invalid email or ID.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="icon-close" onClick={onClose}>&#10005;</span>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <label>Email:</label><br />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div><br />
          <div className="input-box">
            <label>Generated ID:</label><br />
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your generated ID"
            />
          </div><br />
          <button type="submit" className="btn">Login</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Don’t have an account?{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              onClose();
              onSwitchToSignUp();
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
