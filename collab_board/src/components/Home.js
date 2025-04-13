import React from "react";
import "../App.css";

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-content">
        <h1>Welcome to CollabBoard</h1>
        <p>Connect. Collaborate. Communicate.</p>
      </div>
    </div>
  );
};

export default Home;
