import React from 'react';
const { useState } = React;

const MovieListEntry = ({ movie, toggleWatchStatus }) => {

  const statusHandler = function () {
    toggleWatchStatus(movie);
  }

  const toggleMovieHandler = function () {
    let element = document.getElementById(movie.title);
    let title = document.getElementById(`title-${movie.title}`);
    if (element.style.display === 'none') {
      title.style.fontWeight = 'bold';
      element.style.display = 'block';
    } else {
      title.style.fontWeight = 'normal';
      element.style.display = 'none';
    }
  }

  return (
    <div className="movieentry">
      <div id={`title-${movie.title}`} onClick={toggleMovieHandler}>{movie.title}</div>
      <div className='toggleMovie' id={movie.title} style={{display: 'none'}}>
        <ul>
          <li>Year: {movie.year}</li>
          <li>Runtime: {movie.runtime}</li>
          <li>Rating: {movie.rating}</li>
          <li>Status: <button className="status button" onClick={statusHandler}>{movie.watch}</button></li>
        </ul>
        <img src={movie.picture} alt={movie.title}></img>
      </div>
    </div>
  );
}

export default MovieListEntry;