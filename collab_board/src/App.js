import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import VideoCall from "./components/VideoCall";
import Contact from "./components/Contact"; // Import the Contact page
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Review from "./components/Review";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">🎥 Collabboard</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/call">Video Call</Link></li>
            <li><Link to="/contact">Contact Us</Link></li> {/* Add link to Contact Us */}
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/review">Rate US</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/call" element={<VideoCall />} />
          <Route path="/contact" element={<Contact />} /> {/* Add route for Contact Us */}
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/review" element={<Review />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
