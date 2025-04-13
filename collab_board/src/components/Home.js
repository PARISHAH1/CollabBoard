import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay" />
      <div className="home-content">
        <h1>Welcome to CollabBoard</h1>
        <p>Connect. Collaborate. Communicate.</p>
        <p>Your seamless video calling experience</p>
      </div>
      <div className="home-extra-links">
      <p>
        Not a member yet? <Link to="/signup">Join the SmartConnect community</Link> — it's quick and easy!
      </p>
      <p>
        Already part of the crew? <Link to="/signin">Sign in here</Link> and get started.
      </p>
</div>
    </div>
  );
};

export default Home;
