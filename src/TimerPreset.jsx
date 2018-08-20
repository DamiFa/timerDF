import React from 'react';
import {formatTimer, hashTime} from "./services/timerFormatter";

const TimerPreset = ({onClick, timeInSeconds, onDelete}) => (
  <li className="preset-item">
    <h3 type="button" onClick={onClick}>{formatTimer(hashTime(timeInSeconds))}</h3>
    <span onClick={onDelete}><i className="fas fa-trash"></i></span>
  </li>
)

export default TimerPreset;