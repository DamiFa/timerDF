import React from 'react';

const TimerControl = ({onStart, onPause, onResume, onReset}) => (
  <div>
    <button onClick={onStart}>Start</button>
    <button onClick={onPause}>Pause</button>
    <button onClick={onResume}>Resume</button>
    <button onClick={onReset}>Reset</button>
  </div>
)

export default TimerControl;