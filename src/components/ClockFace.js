import React, { Component } from 'react';
import ClockDigits from './ClockDigits';

import './ClockFace.css';

export default class ClockFace extends Component {

  constructor() {
    super();
    let totalTimeStarted = 5000;
    this.state = {
      totalTimeStarted: totalTimeStarted, //default 1500000
      currentTime: totalTimeStarted,
      previousTime: 0,
      sessionType: "FOCUS", //FOCUS or BREAK
      sessionStatus: "READY", // READY RUNNING PAUSED FINISHED
      isRunning: false,
      sessionSuccess: false,
      sessionStartTime: null,
      objective: '',
      description: '',
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.onTick);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
    this.setState({
      // isRunning: true,
      sessionType: "FOCUS",
      sessionStatus: "RUNNING",
      previousTime: Date.now(),
      sessionSuccess: false,
      sessionStartTime: Date.now()
    })
  }

  onPause = () => {
    this.setState({
      sessionStatus: "PAUSED"
    })
  }

  onReset = () => {
    this.setState({
      currentTime: this.state.totalTimeStarted,
      previousTime: Date.now(),
      sessionType: "FOCUS",
      sessionStatus: "READY"
    })
  }

  onTick = () => {
    if (this.state.sessionStatus === "RUNNING") {
      let now = Date.now();
      let thisTime = this.state.currentTime - (now - this.state.previousTime);
      if (thisTime <= 0) {
        this.onFinished();
      } else {
      this.setState({
        currentTime: thisTime,
        previousTime: Date.now(),
      });
    }
    }
  };

  onFinished = () => {
    this.setState({
      sessionStatus: "FINISHED",
    })
  }

  toggleSuccess = () => {
    this.setState({
      sessionSuccess: !this.state.sessionSuccess,
    })
  }

  onLog = () => {
    let item = {
      objective: this.state.objective,
      startTime: this.state.sessionStartTime,
      duration: this.state.totalTimeStarted,
      description: this.state.description
    }

    this.props.pushLogItem(item);

    this.setState({
        objective: '',
        description: '',
        currentTime: this.state.totalTimeStarted,
        previousTime: Date.now(),
        sessionType: "FOCUS",
        sessionStatus: "READY"
      });
  }

  onObjectiveChange = (e) => {
    this.setState({ objective: e.target.value})
  }
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value})
  }

  render() {

    let status = this.state.sessionStatus;
    let appStatusCSS;
    switch (status) {
      case "READY":
        appStatusCSS = "clockFace_READY";
        break;
      case "RUNNING":
        appStatusCSS = "clockFace_RUNNING";
        break;
      case "PAUSED":
        appStatusCSS = "clockFace_PAUSED";
        break;
      default:
        appStatusCSS = "clockFace_READY";
        break;
    }

    return (
      <div className={"clockFace " + appStatusCSS} >
        <div className="clockFace-pane">
          <ClockDigits elapsedTime={ this.state.currentTime } />
          <div className="clockFace-buttons">
            { status === "FINISHED" ?
                <button onClick={this.onLog}>Log Session and Break</button>
            :
              status === "RUNNING" ?
              <button onClick={this.onPause}>Pause</button>
              :
              <div>
                <button onClick={this.onStart}>
                  { status === "PAUSED" ? "Resume" : "Start" }
                </button>
                <button onClick={this.onReset}>Reset</button>
              </div>
            }

          </div>
        </div>
        <div className="clockFace-pane">
          <input
            type="text"
            placeholder="Objective"
            onChange={this.onObjectiveChange}
            value={this.state.objective} />
          <div className="clockFace-textarea-container">
            <textarea
              placeholder="Description and notes..."
              onChange={this.onDescriptionChange}
              value={this.state.description} />
          </div>
          { status === "FINISHED" ?
            <div>
              <input
                type="checkbox"
                name="success"
                checked={this.state.sessionSuccess}
                onChange={this.toggleSuccess}/>
              <label htmlFor="success"> Success?</label>
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}
