const express = require('express');
const cors = require('cors');
const moviesHandler = require('./movies');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesHandler);

module.exports = app;
