import React, { Component } from "react";
import Timer from './services/timer';
import TimerDisplay from './TimerDisplay'
import TimerControl from './TimerControls';
import TimerForm from './TimerForm';
import PresetList from "./PresetList";
import { formatTimer } from "./services/timerFormatter"
import sound from "./sounds/bubbles.mp3";

class TimerMain extends Component{
  constructor(){
    super();

    this.timer = new Timer(0);

    this.state = {
      currentTime: this.timer.getCurrentTime(),
      // currentTimeInSeconds: this.timer.getCurrentTimeInSeconds(),
      startingTime: 0,
    }
    
    this.sound = new Audio(sound);

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setUpTimer = this.setUpTimer.bind(this);
  }

  componentDidMount(){
    this.setUpTimer();
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
  
  setUpTimer(secondsToSetUp){
    if(secondsToSetUp){
      this.resetTimer();
      this.timer = new Timer(secondsToSetUp);
      
      this.setState({
        currentTime: this.timer.getCurrentTime(),
        startingTime: secondsToSetUp
      })
    }

    this.timer.addEventListener(
      "secondUpdated", 
      () => this.setState({currentTime: this.timer.getCurrentTime()})
    );

    this.timer.addEventListener(
      "started", 
      () => this.setState({currentTime: this.timer.getCurrentTime()})
    );

    this.timer.addEventListener(
      "restarted", 
      () => this.setState({currentTime: this.timer.getCurrentTime()})
    );

    this.timer.addEventListener(
      "ended",
      () => {
        this.sound.play();
      }
    )
  }

  render(){
    let percentTime = this.state.startingTime <= 0 ? 0 : this.timer.getCurrentTimeInSeconds() / this.state.startingTime;

    return(
      <div id="main">
        <TimerDisplay 
          time={formatTimer(this.state.currentTime)}
          progress={percentTime}
        />
        <TimerControl 
          onStart={this.startTimer}
          onPause={this.pauseTimer}
          onResume={this.resumeTimer}
          onReset={this.resetTimer}
        />
        <TimerForm onSubmit={this.setUpTimer}/>
        <PresetList onClick={this.setUpTimer}/>
      </div>
    )
  }
}

export default TimerMain;