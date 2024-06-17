const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve JavaScript files with correct MIME type
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviesdb', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false, // Add this option to avoid deprecation warnings
  useCreateIndex: true // Add this option to avoid deprecation warnings
});
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  watched: Boolean
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

app.post('/api/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.json(savedMovie);
});


app.put('/api/movies/:id', async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedMovie);
});

app.delete('/api/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
