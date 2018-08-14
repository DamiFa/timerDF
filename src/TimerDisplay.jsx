import React from "react";

const TimerDisplay = ({time, progress}) => {
  const radius = 150;
  const circumference = 2*Math.PI*radius;
  const dashSize = -circumference*(1-progress);

  return (
    <div id="timer-display">
      <svg className="timer-display-circle" style={{transform: 'rotate(-90deg)'}}>
        <circle 
          r={radius}
          className="circle-background"
        >
        </circle>
        <circle 
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashSize}
        >
        </circle>
      </svg>
      <h1 className="timer-display-time">
        {time}
      </h1>
    </div>
  )
}

export default TimerDisplay;