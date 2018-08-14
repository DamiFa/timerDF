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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="hours">
          <input 
            type="number"
            name="hours"
            id="hours"
            step="1"
            min="0"
            value={hours}
            placeholder="Hours"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="minutes"> : 
          <input 
            type="number"
            name="minutes"
            id="minutes"
            step="1"
            min="0"
            value={minutes}
            placeholder="Minutes"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="seconds"> : 
          <input 
            type="number"
            name="seconds"
            id="seconds"
            step="1"
            min="0"
            value={seconds}
            placeholder="Seconds"
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">
          Set
        </button>
      </form>
    )
  }
}

export default TimerForm;