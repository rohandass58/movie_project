const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    watched: req.body.watched,
    rating: req.body.rating
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    if (req.body.title != null) movie.title = req.body.title;
    if (req.body.description != null) movie.description = req.body.description;
    if (req.body.releaseYear != null) movie.releaseYear = req.body.releaseYear;
    if (req.body.genre != null) movie.genre = req.body.genre;
    if (req.body.watched != null) movie.watched = req.body.watched;
    if (req.body.rating != null) movie.rating = req.body.rating;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await movie.remove();
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
