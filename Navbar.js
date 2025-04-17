import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Optional: style it separately

const Navbar = ({ onSignIn, onSignUp }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">CollabBoard</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/call">Join Call</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        </ul>
        <button class="btnLogin-popup" onClick={onSignIn}>Sign In</button>
        <button class="btnLogin-popup" onClick={onSignIn}>Sign Up</button>
    </nav>
  );
};

export default Navbar;
