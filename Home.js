import React from "react";
import "../App.css";

const Home = () => {
  return (
    <div className="page home">
      <h1>Welcome to <span className="highlight">Collabboard</span></h1>
      <p>Your lightweight and elegant solution for video conferencing</p>
      <img src="https://source.unsplash.com/800x400/?video,conference" alt="Video Conferencing" className="banner-image" />
    </div>
  );
};

export default Home;