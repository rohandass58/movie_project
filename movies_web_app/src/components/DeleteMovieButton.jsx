import React from 'react';

const DeleteMovieButton = ({ movieId }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'DELETE'
    }).then(() => window.location.reload());
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteMovieButton;
