const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const app = express();

// CORS middleware configuration
app.use(cors({
  origin: '*', // Replace with your frontend URL or '*' to allow all origins
  methods: ['GET', 'PUT', 'POST'], // Add the HTTP methods you want to allow
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Add headers you want to allow
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection (replace with your cloud MongoDB connection string)
mongoose.connect('mongodb+srv://rohandass58:pryoNn5sDTQtcKS1@cluster0.e1minrn.mongodb.net/moviesdb?retryWrites=true&w=majority&appName=Cluster0', {});

// Define the movie schema and model
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  watched: Boolean,
});
const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (deletedMovie) {
      res.json({ message: 'Movie deleted' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});