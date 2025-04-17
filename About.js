import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <video autoPlay loop muted className="background-video">
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-digital-space-with-glowing-particles-1290-large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="about-overlay" />
      <div className="about-content">
        <h1>About CollabBoard</h1>
        <p>
          <strong>CollabBoard</strong> is your modern solution for seamless, real-time video collaboration. 
          Whether you're working on a project, attending a virtual classroom, or connecting with your team remotely — CollabBoard keeps you just a click away.
        </p>
        <p>
          Built using cutting-edge technologies like <strong>React.js</strong>, <strong>WebRTC</strong>, and <strong>Socket.IO</strong>, 
          CollabBoard ensures high-performance peer-to-peer connections, crystal-clear video calls, and interactive collaboration features.
        </p>
        <p>
          Our mission is to bridge distances with technology and empower people to work, learn, and create together — no matter where they are.
        </p>
      </div>
    </div>
  );
};

export default About;
