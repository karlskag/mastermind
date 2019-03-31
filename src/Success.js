import React from 'react';
import * as core from './core';
import './Success.css';

export default function (props) {
  const state = props.state;
  return (
    <div>
      <h2>COMBINATION CORRECT!</h2>
      <h3 style={{marginBottom: 50}}>- You got it right after <u>{core.getNumberOfGuesses(state)} guesses</u> -</h3>
      <div
        className="replayButton"
        onClick={function () {
          props.triggerEvent({
            name: 'restartChosen'
          });
      }}>RESTART</div>
    </div>
  );
}
