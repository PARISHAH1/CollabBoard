import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation / logic (expand later with backend)
    if (name && email && password) {
      alert("Account created successfully!");
      navigate("/signin");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div><br />
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div><br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
