import React, { useState } from "react";
import "../styles/Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    alert(`Thanks for your ${rating}-star rating!`);
    setRating(0);
    setReview("");
  };

  return (
    <div className="review-container">
      <h2>Rate Your Experience</h2>
      <p className="subtitle">We value your feedback!</p>
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${starValue <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>
      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default Review;
