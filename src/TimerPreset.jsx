import React from 'react';

const TimerPreset = ({setPreset, preset}) => (
  <button onClick={setPreset}>{preset}</button>
)

export default TimerPreset;