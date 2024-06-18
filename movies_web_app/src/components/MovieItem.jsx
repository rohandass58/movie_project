import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className="star"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.686 1.532 8.298-7.468-4.186-7.468 4.186 1.532-8.298-6.064-5.686 8.332-1.151z" />
          </svg>
        );
      })}
    </div>
  );
};

const MovieItem = ({ movie }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://movie-project-backend-api.vercel.app/api/movies/${movie._id}`);
      window.location.reload(); // Refresh the page after deletion
    } catch (error) {
      console.error('There was an error deleting the movie!', error);
    }
  };

  const handleToggleWatchStatus = async () => {
    try {
      await axios.put(`https://movie-project-backend-api.vercel.app/api/movies/${movie._id}`, {
        ...movie,
        watched: !movie.watched
      });
      window.location.reload(); // Refresh the page after updating
    } catch (error) {
      console.error('There was an error updating the movie!', error);
    }
  };

  return (
    <div className="movie-item">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p><strong>Year:</strong> {movie.releaseYear}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <StarRating rating={movie.rating} />
      <div className="actions">
        <Link to={`/movie/${movie._id}`}><button>Details</button></Link>
        <Link to={`/edit/${movie._id}`}><button>Edit</button></Link>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleToggleWatchStatus}>
          {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
