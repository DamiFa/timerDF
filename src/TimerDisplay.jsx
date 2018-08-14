import React from "react";

const TimerDisplay = ({time, progress}) => {
  const radius = 90;
  const circumference = 2*Math.PI*radius;
  const dashSize = -circumference*(1-progress);

  return (
    <div id="timer-display">
      <svg style={{transform: 'rotate(-90deg)'}}>
        <circle 
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#FF8F1E"
          strokeDasharray={circumference}
          strokeDashoffset={dashSize}
        >
        </circle>
      </svg>
      {time}
    </div>
  )
}

export default TimerDisplay;