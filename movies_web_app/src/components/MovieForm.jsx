import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';

const MovieForm = ({ isEdit }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    watched: false,
    rating: 0
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:4000/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => console.error("Error fetching movie:", error));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setMovie(prevMovie => ({ ...prevMovie, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = 'http://localhost:4000/api/movies';
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  );
};

export default MovieForm;
