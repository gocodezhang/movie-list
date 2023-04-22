import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = ({ movielist, toggleWatchStatus }) => {
  return movielist.length === 0 ? (<div>no movie found</div>) :
    (
      <div className="movielist">
        {movielist.map((movie) => (
          <MovieListEntry movie={movie} key={movie.title} toggleWatchStatus={toggleWatchStatus} />
        ))}
      </div>
    )
}

export default MovieList;