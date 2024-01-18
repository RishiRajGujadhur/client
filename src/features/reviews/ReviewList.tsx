import React from 'react';
import ReviewCard from './ReviewCard';
import { Review } from '../../models/review';

interface ReviewProps {
  reviews: Review[]; // Array of review objects
}

const ReviewList: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;