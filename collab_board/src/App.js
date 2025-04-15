import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import VideoCall from "./components/VideoCall";
import Contact from "./components/Contact";
import Review from "./components/Review";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">🎥 Collabboard</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/call">Join Call</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/review">Rate US</Link></li>
          </ul>
          <button className="btnLogin-popup" onClick={() => setShowSignIn(true)}>Sign In</button>
          <button className="btnLogin-popup" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </nav>

        {/* Modals */}
        {showSignIn && (
          <SignIn
            onClose={() => setShowSignIn(false)}
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        )}
        {showSignUp && (
          <SignUp
            onClose={() => setShowSignUp(false)}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/call" element={<VideoCall />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
