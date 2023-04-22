import React from 'react';
const { useState } = React;

const ToggleButtons = ({ filterWatchStatusAfterClick }) => {
  return (
    <>
      <input id="reset" type="button" value="Reset" className="button"
      onClick={(e) => (filterWatchStatusAfterClick(document.getElementById("reset").value))}></input>
      <input id="watched" type="button" value="Watched" className="button"
      onClick={(e) => (filterWatchStatusAfterClick(document.getElementById("watched").value))}></input>
      <input id="towatch" type="button" value="To watch" className="button"
      onClick={(e) => (filterWatchStatusAfterClick(document.getElementById("towatch").value))}></input>
    </>
  )
}

export default ToggleButtons;