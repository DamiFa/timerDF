import React from 'react';
import { TIMER_STATE } from "./services/timer";

const TimerControl = ({onStart, onPause, onResume, onReset, timerState}) => {
  let buttonToRender;

  switch (timerState) {
    case TIMER_STATE.default:
      buttonToRender = <label onClick={onStart}><i className="fas fa-play"></i></label>;
      break;

    case TIMER_STATE.running:
      buttonToRender = <label onClick={onPause}><i className="fas fa-pause"></i></label>;
      break;

    case TIMER_STATE.paused:
      buttonToRender = <label onClick={onResume}><i className="fas fa-play"></i></label>;
      break;

    default:
      break;
  }

  return (
    <div id="timer-controls">
      {buttonToRender}
      <label onClick={onReset}><i className="fas fa-undo-alt"></i></label>
    </div>
  )
}

export default TimerControl;