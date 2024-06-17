import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className={`star ${ratingValue <= rating ? 'filled' : 'empty'}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.686 1.532 8.298-7.468-4.186-7.468 4.186 1.532-8.298-6.064-5.686 8.332-1.151z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
