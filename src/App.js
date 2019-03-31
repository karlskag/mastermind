import React, { Component } from 'react';
import './App.css';
import GameStage from './GameStage';
import ColorSelect from './ColorSelect';
import * as core from './core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = core.createState();
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent({name, data}) {
    const state = this.state;
    if (name === 'colorChosen') {
      this.setState(core.addColorToCurrentGuess(state, data));
    } else if (name === 'restartChosen') {
      this.setState(core.createState());
    } else if (name === 'hiddenColorClick') {
      this.setState(core.revealColor(state, data));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="GameContainer">
          <GameStage state={this.state} triggerEvent={this.handleEvent}/>
          <ColorSelect state={this.state} triggerEvent={this.handleEvent}/>
        </div>
      </div>
    );
  }
}

export default App;
