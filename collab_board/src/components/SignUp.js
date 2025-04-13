import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  const navigate = useNavigate();

  const formatDOB = (dobString) => {
    const [year, month, day] = dobString.split("-");
    const shortYear = year.slice(-2);
    return `${day}${month}${shortYear}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (name && email && dob && contact && password) {
      const firstName = name.trim().split(" ")[0] || "";
      const last4 = contact.slice(-4);
      const dobFormatted = formatDOB(dob);

      const userId = `${firstName}@${dobFormatted}#${last4}`;
      setGeneratedId(userId);

      // Optional: navigate("/signin"); after delay
    } else {
      alert("Please fill all fields");
    }
  };

  const handleCopy = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      alert("ID copied to clipboard!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create New Account</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label><br />
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </div><br />
        <div>
          <label>Email:</label><br />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div><br />
        <div>
          <label>Date of Birth:</label><br />
          <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
        </div><br />
        <div>
          <label>Contact Number:</label><br />
          <input type="tel" required maxLength="10" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div><br />
        <div>
          <label>Password:</label><br />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div><br />
        <button type="submit">Register</button>
      </form>

      {generatedId && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <strong>You successfully Created Your Account!!</strong>
          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <strong>Your Generated ID:</strong>
            <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{generatedId}</span>
            <button onClick={handleCopy} style={{ padding: "4px 10px", cursor: "pointer", fontSize: "0.9rem" }}>
              Copy
            </button>
          </div>
        </div>
      )}

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
