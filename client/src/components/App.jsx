import React from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovieTitle from './AddMovieTitle.jsx';
import ToggleButtons from './ToggleButtons.jsx';
import axios from 'axios';
const { useState, useEffect } = React;

// var movies = [
//   {title: 'Iron Man', watch: 'To watch', year: '2008', runtime: '126min',
//   rating: 7.9, picture: 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/c0/639a7b035cbaa/clean.jpg'},
//   {title: 'Captain America: The First Avenger', watch: 'Watched', year: '2011', runtime: '124min',
//   rating: 6.9, picture: 'https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_.jpg'},
//   {title: 'Avenger: Endgame', watch: 'Watched', year: '2018', runtime: '182min',
//   rating: 8.4, picture: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg'},
//   {title: 'Inception', watch: 'Watched', year: '2010', runtime: '148min',
//   rating: 8.8, picture: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'},
//   {title: 'Forrest Gump', watch: 'Watched', year: '1994', runtime: '142min',
//   rating: 8.8, picture: 'https://m.media-amazon.com/images/I/81xTx-LxAPL._AC_UF894,1000_QL80_.jpg'}
// ];

const App = (props) => {
  const [currentMovieList, setCurrentMovieList] = useState([]);
  const [displayMovieList, setDisplayMovieList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/movies')
    .then((response) => {
      setCurrentMovieList(response.data);
      setDisplayMovieList(response.data);
    })
  },[])

  const filterInputAfterClick = function (input) {
    let filteredDisplayMovieList = displayMovieList.filter( function(movie) {
      return movie.title.includes(input)
    });
    setDisplayMovieList(filteredDisplayMovieList);
  }

  const addInputAfterClick = function (input) {
    let movie = {
      title: input,
      watch: 'To watch',
      year: 'Unknown',
      runtime: 'Unknown',
      rating: 0,
      picture: ''
    };
    axios.post('/api/movies', movie);
    setCurrentMovieList(currentMovieList.concat(movie));
    setDisplayMovieList(displayMovieList.concat(movie));
  }

  const toggleWatchStatus = function (updateMovie) {
    let updatedMovieList = currentMovieList.map( function (movie) {
      if (movie === updateMovie) {
        if (updateMovie.watch === 'Watched') {
          const updatedMovie = {title: updateMovie.title, watch: 'To watch', year: updateMovie.year, runtime: updateMovie.runtime, rating: updateMovie.rating
        , picture: updateMovie.picture}
          axios.post('/api/movies', updatedMovie);
          return updatedMovie
        } else {
          const updatedMovie = {title: updateMovie.title, watch: 'Watched', year: updateMovie.year, runtime: updateMovie.runtime, rating: updateMovie.rating
        , picture: updateMovie.picture}
          axios.post('/api/movies', updatedMovie);
          return updatedMovie
        }
      }
      return movie
    });
    let updatedDisplayMovieList = displayMovieList.map( function (movie) {
      if (movie === updateMovie) {
        if (updateMovie.watch === 'Watched') {
          return {title: updateMovie.title, watch: 'To watch', year: updateMovie.year, runtime: updateMovie.runtime, rating: updateMovie.rating
          , picture: updateMovie.picture}
        } else {
          return {title: updateMovie.title, watch: 'Watched', year: updateMovie.year, runtime: updateMovie.runtime, rating: updateMovie.rating
          , picture: updateMovie.picture}
        }
      }
      return movie
    });
    setCurrentMovieList(updatedMovieList);
    setDisplayMovieList(updatedDisplayMovieList);
  }

  const filterWatchStatusAfterClick = function (watchStatus) {
    let filteredMovieList = currentMovieList.filter( function(movie) {
      if (watchStatus === 'Reset') {
        return true;
      }
      return movie.watch === watchStatus;
    });
    setDisplayMovieList(filteredMovieList);
  }

  return (
    <div>
      <div className="add container"><AddMovieTitle addInputAfterClick={addInputAfterClick}/></div>
      <div className="search container">
        <ToggleButtons filterWatchStatusAfterClick={filterWatchStatusAfterClick}/>
        <Search filterInputAfterClick={filterInputAfterClick}/>
        </div>
      <div className="list container"><MovieList movielist={displayMovieList} toggleWatchStatus={toggleWatchStatus}/></div>
    </div>
  );
}
// <div><AddMovieTitle addInputAfterClick={addInputAfterClick}/></div>
// <div><Search filterInputAfterClick={filterInputAfterClick}/></div>
/* ---------- Movie List Component --------------- */

// Create a single movie entry
// const MovieListEntry = ({ movie }) => (
//   <li>{movie.title}</li>
// )

// Create the movie list
// const MovieList = ({ movielist }) => {
//   return movielist.length === 0 ? (<div>no movie by that name found</div>) :
//     (
//       <ul>
//         {movielist.map((movie) => (
//           <MovieListEntry movie={movie} key={movie.title} />
//         ))}
//       </ul>
//     )
// }

/* ---------- Search --------------- */

// const Search = ( { filterInputAfterClick }) => {
//   const [input, setInput] = useState('');
//   const handleClick = function () {
//     filterInputAfterClick(input);
//   }

//   return (
//     <div className="searchbar">
//       <input className="searchInput" placeholder="Search..."
//       onChange={(e) => (setInput(e.target.value))}></input>
//       <button className="searchButton" onClick={handleClick}>Go!</button>
//     </div>
//   )
// }

// /* ---------- Add Movie title --------------- */

// const AddMovieTitle = ( { addInputAfterClick }) => {
//   const [addMovie, setAddMovie] = useState('');
//   const addMovieClick = function () {
//     addInputAfterClick(addMovie);
//   }

//   return (
//     <div className="title">
//       <input className="movieInput" placeholder="Add a movie"
//       onChange={(e) => (setAddMovie(e.target.value))}></input>
//       <button className="addmovie" onClick={addMovieClick}>Add</button>
//     </div>
//   )
// }




export default App;