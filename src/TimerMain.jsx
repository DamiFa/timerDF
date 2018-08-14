import React, { Component } from "react";
import Timer, { TIMER_STATE } from './services/timer';
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
      currentState: TIMER_STATE.default,
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
    document.addEventListener("keypress", (e) => {
      if(e.keyCode === 32){
        switch (this.state.currentState) {
          case TIMER_STATE.default:
            this.startTimer();
            break;
  
          case TIMER_STATE.running:
            this.pauseTimer();
            break;
  
          case TIMER_STATE.paused:
            this.resumeTimer();
            break;
  
          default:
            break;
        }
      }
    })
  }

  startTimer(){
    this.timer.start();
    this.setState({currentState: TIMER_STATE.running});
  }

  pauseTimer(){
    this.timer.pause();
    this.setState({currentState: TIMER_STATE.paused});
  }

  resumeTimer(){
    this.timer.resume();
    this.setState({currentState: TIMER_STATE.running});
  }

  resetTimer(){
    this.timer.reset();
    this.setState({currentState: TIMER_STATE.default});
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
    let {currentState, startingTime} = this.state;
    let percentTime = startingTime <= 0 ? 0 : this.timer.getCurrentTimeInSeconds() / startingTime;

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
          timerState={currentState}
        />
        <TimerForm onSubmit={this.setUpTimer}/>
        <PresetList onClick={this.setUpTimer}/>
      </div>
    )
  }
}

export default TimerMain;