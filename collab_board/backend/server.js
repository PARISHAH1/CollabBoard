const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // To allow requests from the frontend (same domain issues)
app.use(bodyParser.json()); // Parse incoming JSON data

// Contact Route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // For demonstration purposes, log the message to the console
  console.log("Contact Form Submitted: ", { name, email, message });

  // Simulate successful submission
  res.status(200).json({ success: true, message: "Message received successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
