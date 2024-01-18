import React, { useState } from 'react';
import { Review } from '../../models/review';

interface WriteReviewFormProps {
  onSubmit: (review: Review) => void; // Function to submit review data
}

const WriteReviewForm: React.FC<WriteReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(5); // Initial rating
  const [text, setText] = useState(''); // Review text

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit({
        rating, text,
        id: 0,
        author: '',
        date: ''
    });
    setRating(5); // Reset rating after submission
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <div className="rating-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} onClick={() => setRating(i + 1)}>
            ★
          </span>
        ))}
      </div>
      <label>Review:</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default WriteReviewForm;