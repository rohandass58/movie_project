import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovieButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add');
  };

  return (
    <button onClick={handleClick}>Add New Movie</button>
  );
};

export default AddMovieButton;
