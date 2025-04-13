import React, { useState } from "react";
import "../App.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !message) {
      setStatus("Please fill out all fields.");
      return;
    }

    // Construct the contact form data
    const contactData = { name, email, message };

    // You can send this data to your backend (e.g., using Axios or Fetch)
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStatus("Your message has been sent. Thank you!");
        } else {
          setStatus("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setStatus("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="page contact">
      <h1><span className="highlight">Contact Us</span></h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
          />
        </div>

        <button type="submit" className="btn green">
          Send Message
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
