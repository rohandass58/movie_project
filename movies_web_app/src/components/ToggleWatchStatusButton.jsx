import React from 'react';

const ToggleWatchStatusButton = ({ movie }) => {
  const handleToggle = () => {
    fetch(`https://movie-project-backend-api.vercel.app/movies/${movie.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ watched: !movie.watched })
    }).then(() => window.location.reload());
  };

  return (
    <button onClick={handleToggle}>
      {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
    </button>
  );
};

export default ToggleWatchStatusButton;
