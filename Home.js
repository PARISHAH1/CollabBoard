import React, { useState } from "react";
import "../styles/Home.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Home = () => {
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
    <>
      <div className="home-container">
        {/* ✅ Direct HD Video Link */}
        <video autoPlay loop muted className="background-video">
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-1166-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="overlay" />

        <div className="home-content">
          <h1>Welcome to <span>CollabBoard</span></h1>
          <p>Connect. Collaborate. Communicate.</p>
          <p>Your seamless video conferencing experience.</p>
          <div className="cta-buttons">
            <button onClick={() => setShowSignUp(true)}>Join Now</button>
            <button onClick={() => setShowSignIn(true)}>Sign In</button>
          </div>
        </div>

        <div className="home-extra-links">
          <p>Be a part of something amazing. Create or join your own space.</p>
        </div>
      </div>

      {/* 🔁 Conditional rendering of forms */}
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
    </>
  );
};

export default Home;
