import React, { useState } from "react";
import "../App.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [likeMost, setLikeMost] = useState("");
  const [improvement, setImprovement] = useState("");
  const [recommend, setRecommend] = useState("");

  const handleSubmit = () => {
    alert(`Thanks, ${name || "User"}! You gave us a ${rating}-star rating.\n\nReview: ${review}\nLiked: ${likeMost}\nTo improve: ${improvement}\nWould recommend: ${recommend}`);
    // Reset all fields
    setRating(0);
    setHover(0);
    setReview("");
    setName("");
    setLikeMost("");
    setImprovement("");
    setRecommend("");
  };

  return (
    <div className="review" style={{ padding: "6rem" }}>
      <h2>Rate & Review Us</h2>
      <p>How was your experience?</p>

      {/* Star Rating */}
      <div className="stars" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="star"
            style={{
              cursor: "pointer",
              color: (hover || rating) >= star ? "#ffc107" : "#5e5f63",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Name */}
      <input class="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name or nickname"
      />

      {/* Review Text */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows="3"
        cols="40"
        placeholder="Write your feedback..."
      />

      {/* What did you like most? */}
      <input class="input"
        type="text"
        value={likeMost}
        onChange={(e) => setLikeMost(e.target.value)}
        placeholder="What did you like the most?"
      />

      {/* What can be improved? */}
      <input class="input"
        type="text"
        value={improvement}
        onChange={(e) => setImprovement(e.target.value)}
        placeholder="What can we improve?"
      />

      {/* Recommend? */}
      <div style={{ marginBottom: "1rem" }}>
        <p>Would you recommend us?</p>
        <label>
          <input
            type="radio"
            name="recommend"
            value="Yes"
            checked={recommend === "Yes"}
            onChange={(e) => setRecommend(e.target.value)}
          />{" "}
          Yes
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="recommend"
            value="No"
            checked={recommend === "No"}
            onChange={(e) => setRecommend(e.target.value)}
          />{" "}
          No. Still need improvement
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Review;
