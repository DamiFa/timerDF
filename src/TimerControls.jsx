import React from 'react';
import { TIMER_STATE } from "./services/timer";

const TimerControl = ({onStart, onPause, onResume, onReset, timerState}) => {
  let buttonToRender;

  switch (timerState) {
    case TIMER_STATE.default:
      buttonToRender = <button onClick={onStart}>Start</button>;
      break;

    case TIMER_STATE.running:
      buttonToRender = <button onClick={onPause}>Pause</button>;
      break;

    case TIMER_STATE.paused:
      buttonToRender = <button onClick={onResume}>Resume</button>;
      break;

    default:
      break;
  }

  return (
    <div>
      {buttonToRender}
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

export default TimerControl;