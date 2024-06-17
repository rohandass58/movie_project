import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('There was an error fetching the movie details!', error));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/movies/${id}`);
      navigate('/');
    } catch (error) {
      console.error('There was an error deleting the movie!', error);
    }
  };

  const handleToggleWatchStatus = async () => {
    try {
      await axios.put(`http://localhost:4000/api/movies/${id}`, {
        ...movie,
        watched: !movie.watched
      });
      setMovie({ ...movie, watched: !movie.watched });
    } catch (error) {
      console.error('There was an error updating the movie!', error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p><strong>Year:</strong> {movie.releaseYear}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <StarRating rating={movie.rating} />
      <p><strong>Watched:</strong> {movie.watched ? 'Yes' : 'No'}</p>
      <div className="actions">
        <button onClick={handleToggleWatchStatus}>
          {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      </div>
    </div>
  );
};

export default MovieDetails;
