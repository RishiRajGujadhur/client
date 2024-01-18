import React, { useState } from 'react';

interface ReviewProps {
  review: {
    author: string;
    rating: number; // Out of 5 stars
    date: string; // Formatted date string
    text: string;
    image?: string; // Optional image URL
  };
}

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const toggleFullReview = () => setShowFullReview(!showFullReview);

  return (
    <div className="review-card">
      <div className="review-header">
        <span className="reviewer">{review.author}</span>
        <span className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < review.rating ? 'active' : ''}>
              ★
            </span>
          ))}
        </span>
        <span className="date">{review.date}</span>
      </div>
      <div className="review-body">
        {review.image && <img src={review.image} alt="Review image" />}
        {showFullReview ? review.text : `${review.text.substring(0, 150)}...`}
        {review.text.length > 150 && (
          <button onClick={toggleFullReview}>
            {showFullReview ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;