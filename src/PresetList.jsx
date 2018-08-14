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

  addPreset(sec){
    if(sec > 0){
      let secondsToSetUp = Math.min(sec, 359999);
      let presets = [...this.state.presets, secondsToSetUp];
      localStorage.setItem("presets", presets);
      this.setState({presets, showForm: false});
    } else {
      this.setState({showForm: false});
    }
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
          <div className="preset-timer-form">
            <TimerForm onSubmit={this.addPreset} />
          </div>
      } else {
        displayForm = <button className="preset-add-button" onClick={() => this.setState({showForm: true})}><i className="fas fa-plus"></i></button>
      }
    }
    
    return (
      <div id="presets">
        <ul className="preset-list">
          {timerPresetList}
        </ul>
        {displayForm}
      </div>
    )
  }
}

export default PresetList;