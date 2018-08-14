import React, { Component } from "react";

class TimerForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      seconds: "",
      minutes: "",
      hours: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const {seconds, minutes, hours} = this.state;
    const timeInSeconds = seconds*1 + minutes*60 + hours*60*60;

    e.preventDefault();
    this.props.onSubmit(timeInSeconds);
    this.setState({
      seconds: "",
      minutes: "",
      hours: ""
    })
  }

  render(){
    const {seconds, minutes, hours} = this.state;

    return(
      <div className="timer-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inputs">
            <label htmlFor="hours">
              <input 
                type="number"
                name="hours"
                id="hours"
                step="1"
                min="0"
                value={hours}
                placeholder="H"
                onChange={this.handleChange}
              />
            </label>
  
            <span> : </span>
  
            <label htmlFor="minutes">
              <input 
                type="number"
                name="minutes"
                id="minutes"
                step="1"
                min="0"
                value={minutes}
                placeholder="M"
                onChange={this.handleChange}
              />
            </label>
    
            <span> : </span>
  
            <label htmlFor="seconds">
              <input 
                type="number"
                name="seconds"
                id="seconds"
                step="1"
                min="0"
                value={seconds}
                placeholder="S"
                onChange={this.handleChange}
              />
            </label>
          </div>
  
          <button type="submit">
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default TimerForm;