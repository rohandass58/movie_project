import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddMovieButton from './components/AddMovieButton';
import EditMovie from './components/EditMovie';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Movie Watchlist</h1>
        {/* Moved AddMovieButton inside a route to ensure it's part of the routing context */}
        <Routes>
          <Route path="/" element={
            <>
              <AddMovieButton />
              <MovieList />
            </>
          } />
          <Route path="/add" element={<MovieForm isEdit={false} />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
