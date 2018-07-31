import React, { Component } from "react";
import Timer from './services/timer';
import TimerDisplay from './TimerDisplay'
import TimerControl from './TimerControls'
import sound from "./sounds/bubbles.mp3";

class TimerMain extends Component{
  constructor(){
    super();

    this.timer = new Timer(45*60);

    this.state = {
      currentTime: this.timer.getCurrentTime()
    }
    
    this.sound = new Audio(sound);

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount(){
    this.timer.addEventListener(
      'secondUpdated', 
      () => this.setState({currentTime: this.timer.getCurrentTime()})
    );

    this.timer.addEventListener(
      'restarted', 
      () => this.setState({currentTime: this.timer.getCurrentTime()})
    );

    this.timer.addEventListener(
      "ended",
      () => {
        this.sound.play();
      }
    )
  }

  startTimer(){
    this.timer.start();
  }

  pauseTimer(){
    this.timer.pause();
  }

  resumeTimer(){
    this.timer.resume();
  }

  resetTimer(){
    this.timer.reset();
  }
  
  setUpTimer(){
    
  }

  formatTimer(){
    return `${this.state.currentTime.hours}:${this.state.currentTime.minutes}:${this.state.currentTime.seconds}`;
  }

  render(){
    return(
      <div>
        <TimerDisplay time={this.formatTimer()} />
        <TimerControl 
          onStart={this.startTimer}
          onPause={this.pauseTimer}
          onResume={this.resumeTimer}
          onReset={this.resetTimer}
        />
      </div>
    )
  }
}

export default TimerMain;