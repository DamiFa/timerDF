import React, { Component } from "react";
import countdown from "countdown";
import TimerDisplay from './TimerDisplay'
import TimerControl from './TimerControls'

class TimerMain extends Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentDidMount(){

  }

  startTimer(){
    
  }
  
  setUpTimer(){
    
  }

  formatTimer(){
    return '00:00';
  }

  render(){
    return(
      <div>
        <TimerDisplay time={this.formatTimer()} />
        <TimerControl onStart={this.startTimer}/>
      </div>
    )
  }
}

export default TimerMain;