import React from "react";

import './ClockDigits.css';


const ClockDigits = props => (
  <div className="clockDigits">
    { timeToString(props.elapsedTime) }
  </div>
);

export const timeToString = (time) => {
  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000 % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

export default ClockDigits;
