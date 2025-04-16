import React, { useState, useEffect } from "react";
import "../App.css";

const SignUp = ({ onClose, onSwitchToSignIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Generate ID whenever required fields are valid
  useEffect(() => {
    if (
      firstName.trim() &&
      dob.match(/^\d{4}-\d{2}-\d{2}$/) &&
      contact.match(/^\d{10}$/)
    ) {
      const formattedDob = formatDob(dob);
      const id = `${firstName.toLowerCase()}@${formattedDob}#${contact.slice(-4)}`;
      setGeneratedId(id);
    } else {
      setGeneratedId("");
    }
  }, [firstName, dob, contact]);

  const formatDob = (dob) => {
    const [year, month, day] = dob.split("-");
    return `${day}${month}${year.slice(-2)}`;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !dob || !contact) {
      alert("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!contact.match(/^\d{10}$/)) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    // Save generated ID for later login (mocked using localStorage)
    localStorage.setItem("email", email);
    localStorage.setItem("generatedId", generatedId);

    // Show success message and switch to SignIn modal
    setSuccessMessage(`Signup successful! Your ID: ${generatedId}`);
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
      onSwitchToSignIn();
    }, 2500);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const copyToClipboard = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      alert("ID copied to clipboard!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="icon-close" onClick={onClose}>&#10005;</span>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-box">
            <label>First Name:</label><br />
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div><br />
          <div className="input-box">
            <label>Last Name:</label><br />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div><br />
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
            <label>Date of Birth:</label><br />
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div><br />
          <div className="input-box">
            <label>Contact Number:</label><br />
            <input
              type="text"
              required
              maxLength={10}
              value={contact}
              onChange={(e) => setContact(e.target.value.replace(/\D/, ""))}
            />
          </div><br />

          {generatedId && (
            <>
              <p>Your Generated ID: {generatedId}</p>
              {/* Copy ID button */}
              <button type="button" className="btn" onClick={copyToClipboard}>
                Copy ID
              </button>
            </>
          )}

          {!successMessage && (
            <>
              {/* Signup button */}
              <button type="submit" className="btn">Sign Up</button>
            </>
          )}
        </form>

        {successMessage && (
          <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
        )}

        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              onClose();
              onSwitchToSignIn();
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
