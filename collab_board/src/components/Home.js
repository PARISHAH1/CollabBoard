import React, { useState } from "react";
import "../App.css";
import SignIn from "./SignIn";   // Import SignIn component
import SignUp from "./SignUp";   // Import SignUp component

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
            Not a member yet?{" "}
            <a
              onClick={() => setShowSignUp(true)}
            >
              Join the Smart Community
            </a>{" "}
            — it's quick and easy!
          </p>
          <p>
            Already part of the crew?{" "}
            <a
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </a>{" "}
            and get started.
          </p>
        </div>
      </div>

      {/* Render modals conditionally */}
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
