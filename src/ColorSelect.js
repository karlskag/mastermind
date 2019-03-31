import React from 'react';
import * as core from './core';
import './ColorSelect.css';

export default function (props) {
  const state = props.state;

  function getShape(color) {
    return <span
              onClick={function () {
                props.triggerEvent({
                  name: 'colorChosen',
                  data: color
                });
              }}
              className="selectionCircle"
              style={{backgroundColor: core.colors[color]}}>
           </span>
  }

  return (
    <div className="selectionPanelContainer">
      <h2 style={{paddingLeft: 15}}>Pick a color:</h2>
      {core.getAllColors(state).map(function (color, index) {
        return (
          <span key={color} className="colorContainer">
            {getShape(color)}
          </span>
        );
      })}
    </div>
  );
}
