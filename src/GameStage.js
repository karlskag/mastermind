import React from 'react';
import './Game.css';
import * as core from './core';
import Success from './Success';

export default function (props) {
  const state = props.state;

  function getShape(color) {
    return <span className="circle" style={{backgroundColor: core.colors[color]}}></span>
  }

  function getCorrectShapes(color, index, triggerEvent) {
    const isColorRevealed = state.cheats[index];
    return <span
               className="circle"
               style={{border: '1px solid black',backgroundColor: isColorRevealed ? core.colors[color] : '#f2f2f2'}}
               onClick={function() {
                 props.triggerEvent({
                  name: 'hiddenColorClick',
                  data: index
                 });
               }}>
               {<section style={{paddingTop: 3, paddingLeft: 1}}>?</section>}
             </span>
  }

  function getClues(state, index) {
    const clues = core.getResultForGuess(state, index);
    const noMatch = <span className="smallCircle"></span>;

    return (
      <div>
        <div style={{marginTop: -3}}>
            {clues[0] ? <span className="smallCircle" style={{backgroundColor: core.colors[clues[0]]}}></span> : noMatch}
            {clues[1] ? <span className="smallCircle" style={{backgroundColor: core.colors[clues[1]]}}></span> : noMatch}
        </div>
        <div style={{marginTop: -10}}>
            {clues[2] ? <span className="smallCircle" style={{backgroundColor: core.colors[clues[2]]}}></span> : noMatch}
            {clues[3] ? <span className="smallCircle" style={{backgroundColor: core.colors[clues[3]]}}></span> : noMatch}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div style={{marginBottom: 30, marginLeft: -17}}>
        {core.getCorrectColors(state).map(function (color, index) {
          return <span key={'CorrectColor' + index} className="shapeContainer">{getCorrectShapes(color, index, props.triggerEvent)}</span>;
        })}
      </div>
      <div>
        {core.getGuesses(state).map(function (guess, index) {
          return (
            <div key={'prevGuess' + index} className="prevGuessContainer">
              {guess.map(function (color, index) {
                return <span key={'prevGuessColor' + index} className="shapeContainer">{getShape(color)}</span>;
              })}
              {getClues(state, index)}
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 50}}>
        {core.getCurrentGuess(state).map(function (color, index) {
          return <span key={'currentGuess' + index} className="shapeContainer">{getShape(color)}</span>;
        })}
      </div>
      {core.guessWasCorrect(state) && <Success {...props}/>}
    </React.Fragment>
  );
}
