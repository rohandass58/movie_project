import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Custom StarRating component
const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    onRatingChange(value);
  };

  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            color: i < rating? 'gold' : 'gray'
          }}
          onClick={() => handleClick(i + 1)}
        >
          {i < rating? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const EditMovie = () => {
  const { id } = useParams(); // Extract movie ID from route parameters
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    watched: false,
    rating: 0
  });
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios
    .get(`https://movie-project-frontend.vercel.app/api/movies/${id}`)
    .then(response => {
        setMovie(response.data);
      })
    .catch(error => console.error('There was an error fetching the movie details!', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setMovie(prevMovie => ({
    ...prevMovie,
      [name]: checked? true : false,
    ...(name!== 'watched' && { [name]: value })
    }));
  };

  const handleRatingChange = (rating) => {
    setMovie(prevMovie => ({...prevMovie, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://movie-project-frontend.vercel.app/api/movies/${id}`, movie);
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the movie!', error);
    }
  };

  return (
    <div className="edit-movie">
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={movie.releaseYear}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Watched:
          <input
            type="checkbox"
            name="watched"
            checked={movie.watched}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <StarRating rating={movie.rating} onRatingChange={handleRatingChange} />
        </label>
        <div>
          <button type="submit">Update Movie</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
