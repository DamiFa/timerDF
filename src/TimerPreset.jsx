import React from 'react';
import {formatTimer, hashTime} from "./services/timerFormatter";

const TimerPreset = ({onClick, timeInSeconds, onDelete}) => (
  <li>
    <button onClick={onClick}>{formatTimer(hashTime(timeInSeconds))}</button>
    <span onClick={onDelete}>X</span>
  </li>
)

export default TimerPreset;