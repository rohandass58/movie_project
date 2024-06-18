// require('dotenv').config(); // Load environment variables from .env file
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// // CORS middleware configuration
// app.use(cors({
//   origin: 'https://movie-project-frontend.vercel.app', // Allow requests from your frontend
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // MongoDB connection using environment variable
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((err) => {
//   console.error('MongoDB connection error: ', err);
// });

// // Define the movie schema and model
// const movieSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   releaseYear: Number,
//   genre: String,
//   rating: Number,
//   watched: Boolean,
// });
// const Movie = mongoose.model('Movie', movieSchema);

// // Routes
// app.get('/', async (req, res) => {
//   try {
//     res.send("RADHA RANI KI JAI");
//   } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/api/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/api/movies/:id', async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (movie) {
//       res.json(movie);
//     } else {
//       res.status(404).json({ message: 'Movie not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/movies', async (req, res) => {
//   try {
//     const newMovie = new Movie(req.body);
//     const savedMovie = await newMovie.save();
//     res.status(201).json(savedMovie);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.put('/api/movies/:id', async (req, res) => {
//   try {
//     const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (updatedMovie) {
//       res.json(updatedMovie);
//     } else {
//       res.status(404).json({ message: 'Movie not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete('/api/movies/:id', async (req, res) => {
//   try {
//     const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
//     if (deletedMovie) {
//       res.json({ message: 'Movie deleted' });
//     } else {
//       res.status(404).json({ message: 'Movie not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
