import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className={`star ${ratingValue <= rating? 'filled' : 'empty'}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12.587l3.668 7.568 8.332 1.151-6.064 5.686 1.532 8.298-7.468-4.186-7.468 4.186 1.532-8.298-6.064-5.686 8.332-1.151z" />
          </svg>
        );
      })}
    </div>
  );
};

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
     .get(`http://localhost:4000/api/movies/${id}`)
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
      await axiosInstance.delete(`http://localhost:4000/api/movies/${id}`);
      navigate('/');
    } catch (error) {
      setError('There was an error deleting the movie!');
      console.error('There was an error deleting the movie!', error);
    }
  };

  const handleToggleWatchStatus = async () => {
    try {
      await axiosInstance.put(`http://localhost:4000/api/movies/${id}`, {
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
    const response = await axiosInstance.post('http://localhost:4000/movies', formData);
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
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
              <button onClick={() => navigate(`/edit/${id}`)}>View Details</button>
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
