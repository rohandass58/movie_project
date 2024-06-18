// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware configuration
app.use(cors({
  origin: 'https://movie-project-frontend.vercel.app', // Adjust as per your frontend URL
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));


// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/movies', require('./routes/movies'));

app.get('/', (req, res) => {
  res.send('RADHA RANI KI JAI');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});