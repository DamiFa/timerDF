import React, { Component } from "react";
import TimerPreset from "./TimerPreset";
import TimerForm from "./TimerForm";

const PRESET_LIMIT = 4;

class PresetList extends Component{

  constructor(props){
    super(props);

    this.state = {
      presets: [],
      showForm: false
    }

    this.addPreset = this.addPreset.bind(this);
  }

  componentDidMount(){
    if(localStorage.presets){
      this.setState({presets: [...localStorage.presets.split(',')]});
    }
  }

  handleClick(secondsToSet){
    this.props.onClick(secondsToSet);
  }

  handleDelete(idx){
    let presets = this.state.presets.filter((preset, i) => i !== idx);
    localStorage.setItem("presets", presets);
    this.setState({presets});
  }

  addPreset(timeInSeconds){
    let presets = [...this.state.presets, timeInSeconds];
    localStorage.setItem("presets", presets);
    this.setState({presets, showForm: false});
  }
  
  render() {
    const { presets } = this.state;

    const timerPresetList = presets.map((preset, i) => (
      <TimerPreset 
        key={i} 
        onClick={this.handleClick.bind(this, preset)} 
        timeInSeconds={preset}
        onDelete={this.handleDelete.bind(this, i)}
      />
    ));

    let displayForm;
    if(presets.length < PRESET_LIMIT){
      if(this.state.showForm){
        displayForm = 
          <div>
            <TimerForm onSubmit={this.addPreset} />
            <span onClick={() => this.setState({showForm: false})}>X</span>
          </div>
      } else {
        displayForm = <button onClick={() => this.setState({showForm: true})}>Add Preset</button>
      }
    }
    
    return (
      <div>
        <ul>
          {timerPresetList}
        </ul>
        {displayForm}
      </div>
    )
  }
}

export default PresetList;