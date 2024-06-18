import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './styles.css'; // Import your CSS file

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://movie-project-backend-api.vercel.app/api/movies', { withCredentials: true })
      .then((response) => {
        setMovies(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('There was an error fetching the movies!');
        setIsLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <div className="movie-poster">
                <img src={`/posters/${movie.poster}`} alt={movie.title} />
              </div>
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <StarRating rating={movie.rating} />
                <div className="actions">
                  <Link to={`/movies/${movie._id}`}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
