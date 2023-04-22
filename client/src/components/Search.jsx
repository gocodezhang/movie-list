import React from 'react';
const { useState } = React;

const Search = ( { filterInputAfterClick }) => {
  const [input, setInput] = useState('');
  const handleClick = function () {
    filterInputAfterClick(input);
  }

  return (
    <div className="searchbar">
      <input className="searchInput" placeholder="Search..."
      onChange={(e) => (setInput(e.target.value))}></input>
      <button className="search button" onClick={handleClick}>Go!</button>
    </div>
  )
}

export default Search;