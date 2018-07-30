import React from 'react';

const TimerControl = ({onStart}) => (
  <div>
    <button onClick={onStart}>Start</button>
    <button>Stop</button>
    <button>Reset</button>
  </div>
)

export default TimerControl;