import React, { useState } from "react";
import "../App.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("⚠️ Please fill out all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("⚠️ Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Your message has been sent. Thank you!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Contact error:", error);
      setStatus("❌ Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page contact-page">
      <h1 className="page-title">
        <span className="highlight">Contact Us</span>
      </h1>
      <p className="page-subtitle">We’d love to hear from you. Send us your queries or feedback!</p>
      
      <form onSubmit={handleSubmit} className="form contact-form" aria-label="Contact Form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="input"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="input"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="textarea"
            rows="5"
            aria-required="true"
          />
        </div>

        <button type="submit" className="btn primary-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
