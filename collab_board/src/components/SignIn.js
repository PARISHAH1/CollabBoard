import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test@gmail.com" && password === "1234") {
      alert("Login successful!");
      navigate("/call");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Log In to Your Existing Account</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div><br />
        <div>
          <label>Password:</label><br />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div><br />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
