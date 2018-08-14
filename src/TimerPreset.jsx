import React from 'react';
import {formatTimer, hashTime} from "./services/timerFormatter";

const TimerPreset = ({onClick, timeInSeconds, onDelete}) => (
  <li>
    <label type="button" onClick={onClick}>{formatTimer(hashTime(timeInSeconds))}</label>
    <span onClick={onDelete}>X</span>
  </li>
)

export default TimerPreset;