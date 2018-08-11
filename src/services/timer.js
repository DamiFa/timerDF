export default class Timer {
  constructor(secondsToCountdownFrom){
    this.secondsToCountdownFrom = secondsToCountdownFrom;

    this.initialised();

    this.intervalId = 0;
    this.secondsToCountdownFromAfterPause = this.secondsToCountdownFrom;

    this.eventEmitter = document.createElement('span');
  }

  start(secondsToCountdownFrom = this.secondsToCountdownFrom){
    this.targetTime = new Date().getTime() + secondsToCountdownFrom*1000;
    this.currentTime = new Date().getTime();
    this.distanceInSeconds =  Math.ceil((this.targetTime - this.currentTime) / 1000);
    this.dispatchEvent('started');

    this.intervalId = setInterval(() => {
      console.log(this.distanceInSeconds);
      this.currentTime = new Date().getTime();
      this.distanceInSeconds =  Math.ceil((this.targetTime - this.currentTime) / 1000);
      this.dispatchEvent('secondUpdated');
    
      if(this.distanceInSeconds <= 0){
        clearInterval(this.intervalId);
        console.log("ended");
        this.dispatchEvent("ended");
      }
    }, 1000)
  }

  pause(){
    clearInterval(this.intervalId);
    this.secondsToCountdownFromAfterPause = this.distanceInSeconds;
    this.dispatchEvent('paused');
  }

  resume(){
    clearInterval(this.intervalId);
    this.secondsToCountdownFromAfterPause = this.distanceInSeconds;
    this.start(this.secondsToCountdownFromAfterPause);
    this.dispatchEvent('resumed');
  }

  reset(){
    clearInterval(this.intervalId);
    this.secondsToCountdownFromAfterPause = this.secondsToCountdownFrom;
    this.initialised();
    this.dispatchEvent('restarted');
  }

  initialised(){
    this.targetTime = new Date().getTime() + (this.secondsToCountdownFrom*1000);
    this.currentTime = new Date().getTime();

    this.distanceInSeconds =  (this.targetTime - this.currentTime) / 1000;
  }

  addEventListener (event, listener) {
    this.eventEmitter.addEventListener(event, listener);
  }
  
  removeEventListener (event, listener) {
    this.eventEmitter.removeEventListener(event, listener);
  }

  dispatchEvent (event, data) {
    this.eventEmitter.dispatchEvent(new CustomEvent(event, data));
  }

  getCurrentTime(){
    return {
      seconds: Math.floor(this.distanceInSeconds % 60),
      minutes: Math.floor((this.distanceInSeconds / 60) % 60),
      hours: Math.floor((this.distanceInSeconds / (60*60)) % (60*60))
    };
  }
}