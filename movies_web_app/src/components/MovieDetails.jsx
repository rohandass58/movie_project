import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import StarRating from './StarRating';
import './styles.css'; // Import your CSS file

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    rating: 0,
    watched: false,
  }); // Form data state
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
     .get(`https://localhost:3000/${id}`)
     .then((response) => {
        setMovie(response.data);
        setFormData(response.data); // Initialize formData with fetched data
        setIsLoading(false);
      })
     .catch((error) => {
        setError('There was an error fetching the movie details!');
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`https://localhost:3000/${id}`);
      navigate('/');
    } catch (error) {
      setError('There was an error deleting the movie!');
      console.error('There was an error deleting the movie!', error);
    }
  };

  const handleToggleWatchStatus = async () => {
    try {
      await axiosInstance.put(`https://localhost:3000/${id}`, {
       ...movie,
        watched:!movie.watched,
      });
      setMovie({...movie, watched:!movie.watched });
    } catch (error) {
      setError('There was an error updating the movie!');
      console.error('There was an error updating the movie!', error);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post('https://movie-project-backend-api.vercel.app/movies', formData);
    // Handle success
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    console.error('Config:', error.config);
  }
};

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        {!editMode? (
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <div className="movie-meta">
              <p><strong>Year:</strong> {movie.releaseYear}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
                <StarRating rating={movie.rating} />
              <p><strong>Watched:</strong> {movie.watched? 'Yes' : 'No'}</p>
            </div>
            <div className="actions">
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
              <button onClick={() => navigate(`/edit/${id}`)}>EDIT</button>
              <button type="button" onClick={() => navigate('/')}>Cancel</button>

            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            {/* Add other inputs for description, releaseYear, genre, rating, watched */}
            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
