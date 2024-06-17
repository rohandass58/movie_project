const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  watched: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
