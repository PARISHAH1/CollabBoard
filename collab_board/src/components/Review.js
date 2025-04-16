import React, { useState } from "react";
import "./Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    alert(`Thanks for your ${rating}-star rating!`);
    setRating(0);
    setReview("");
  };

  return (
    <div class="review" style={{ padding: "2rem" }}>
      <h2>Rate & Review Us</h2>
      <p>How was your experience?</p>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rate out of 5"
      />
      <br />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows="4"
        cols="40"
        placeholder="Write your feedback..."
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Review;
