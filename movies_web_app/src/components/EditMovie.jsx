import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';

const EditMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    watched: false,
    rating: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.error('There was an error fetching the movie details!', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setMovie(prevMovie => ({ ...prevMovie, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/movies/${id}`, movie);
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
          <input type="text" name="title" value={movie.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={movie.description} onChange={handleChange} required></textarea>
        </label>
        <label>
          Release Year:
          <input type="number" name="releaseYear" value={movie.releaseYear} onChange={handleChange} required />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={movie.genre} onChange={handleChange} required />
        </label>
        <label>
          Rating:
          <StarRating rating={movie.rating} onRatingChange={handleRatingChange} />
        </label>
        <div>
          <button type="submit">Update Movie</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
