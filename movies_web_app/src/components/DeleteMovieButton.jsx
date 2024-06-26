import React from 'react';

const DeleteMovieButton = ({ movieId }) => {
  const handleDelete = () => {
    fetch(`https://movie-project-backend-api.vercel.app/movies/${movieId}`, {
      method: 'DELETE'
    }).then(() => window.location.reload());
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteMovieButton;
