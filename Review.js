import React, { useState } from "react";
import "../styles/Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") return;

    const newReview = {
      rating,
      text: reviewText,
      date: new Date().toLocaleString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setHover(0);
    setReviewText("");
  };

  return (
    <div className="review-container">
      <h1>Leave a Review 🌟</h1>

      <div className="stars">
        {[...Array(5)].map((_, i) => {
          const index = i + 1;
          return (
            <span
              key={index}
              className={`star ${index <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>

      <textarea
        placeholder="Write your thoughts here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Review</button>

      <div className="all-reviews">
        <h2>All Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} className="review-item">
              <div className="rating-display">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p>{r.text}</p>
              <span className="review-date">{r.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;
