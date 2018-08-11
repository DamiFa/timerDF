import React, { Component } from "react";
import Timer from './services/timer';
import TimerDisplay from './TimerDisplay'
import TimerControl from './TimerControls';
import TimerForm from './TimerForm';
import sound from "./sounds/bubbles.mp3";

class TimerMain extends Component{
  constructor(){
    super();

    this.timer = new Timer(0);

    this.state = {
      currentTime: this.timer.getCurrentTime()
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
  
  setUpTimer(secondsToSetUp = 0){
    this.timer = new Timer(secondsToSetUp);

    this.setState({
      currentTime: this.timer.getCurrentTime()
    })

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

  formatTimer(){
    let { hours, minutes, seconds } = this.state.currentTime;

    return `${this.formateTime(hours)}:${this.formateTime(minutes)}:${this.formateTime(seconds)}`;
  }

  formateTime(timeToFormat){
    let time = timeToFormat.toString();
    if(time.length === 1){
      return `0${time}`;
    }
    else return `${time}`;
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
        <TimerForm setUpTimer={this.setUpTimer}/>
      </div>
    )
  }
}

export default TimerMain;