import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
            color: i < rating ? 'gold' : 'gray',
          }}
          onClick={() => handleClick(i + 1)}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const MovieForm = ({ isEdit }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    watched: false, // Initialize watched as false
    rating: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`https://movie-project-api.vercel.app/api/movies/${id}`) // Updated API URL
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => console.error('Error fetching movie:', error));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: checked || checked, // Handle checkboxes differently
      ...(name !== 'watched' && { [name]: value }), // For non-checkbox inputs, just update the value
    }));
  };

  const handleRatingChange = (rating) => {
    setMovie((prevMovie) => ({ ...prevMovie, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = 'https://movie-project-api.vercel.app/api/movies'; // Updated API URL
    const url = isEdit ? `${baseUrl}/${id}` : baseUrl;
    const method = isEdit ? 'PUT' : 'POST';

    axios({
      method,
      url,
      data: movie,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Success:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;