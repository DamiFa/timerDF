import React, { Component } from "react";
import TimerPreset from "./TimerPreset";

/* !!!!!!!!!!!!!!!!!WIP!!!!!!!!!!!!!!!!!!! */
const PresetList = ({presetList}) => {
  const timerPresetList = presetList.map((preset) => (<TimerPreset  />));

  return (
    {timerPresetList}
  )
}

export default PresetList;