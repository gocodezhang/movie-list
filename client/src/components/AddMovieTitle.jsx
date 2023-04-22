import React from 'react';
const { useState } = React;

const AddMovieTitle = ( { addInputAfterClick }) => {
  const [addMovie, setAddMovie] = useState('');
  const addMovieClick = function () {
    console.log('click');
    addInputAfterClick(addMovie);
    setAddMovie('');
  }

  return (
    <div className="title">
      <input className="movieInput" placeholder="Add a movie" value={addMovie}
      onChange={(e) => (setAddMovie(e.target.value))}></input>
      <button className="addmovie button" onClick={addMovieClick}>Add</button>
    </div>
  )
}

export default AddMovieTitle;