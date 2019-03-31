import * as config from './config';

export const colors = {
  red: '#f17d77',
  blue: '#9ebbc3',
  black: '#1f222b',
  white: '#ffffff',
  yellow: '#fbbe19',
  green: '#9ab19a'
};

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function createState() {
  return {
    correctColors: createCombination(),
    previousGuesses: [],
    currentGuess: [],
    results: {},
    cheats: {
      0: false,
      1: false,
      2: false,
      3: false
    }
  };
}

function createCombination() {
  let colorsToUse = [];
  const possibleColors = Object.keys(colors);

  for (let i = 0; i < config.difficulty; i++) {
      colorsToUse.push(possibleColors[Math.floor(Math.random() * possibleColors.length)]);
  }

  return shuffle(colorsToUse);
}

export function revealColor(state, index) {
  state.cheats[index] = true;
  return state;
}

export function getCorrectColors(state) {
  return state.correctColors;
}

export function getCurrentGuess(state) {
  return state.currentGuess;
}

export function getGuesses(state) {
  return state.previousGuesses;
}

export function getAllColors(state) {
  return Object.keys(colors);
}

export function addColorToCurrentGuess(state, color) {
  state.currentGuess = state.currentGuess.concat([color]);
  if (state.currentGuess.length === 4) {
    state.results[state.previousGuesses.length] = checkGuess(state, state.currentGuess);
    state.previousGuesses = state.previousGuesses.concat([state.currentGuess]);
    state.currentGuess = [];
  }
  return state;
}

function arraysEqual(a1,a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) === JSON.stringify(a2);
}

export function guessWasCorrect(state) {
  return arraysEqual(state.correctColors, state.previousGuesses[state.previousGuesses.length - 1]);
}

export function getNumberOfGuesses(state) {
  return state.previousGuesses.length;
}

export function getResultForGuess(state, index) {
  return state.results[index];
}

export function checkGuess(state, guess) {
  let possibleMatches = [...state.correctColors]
  let correct = [];
  let almost = [];

  //Check for right color and position
  guess.forEach(function (color, index) {
    if (color === state.correctColors[index]) {
      const matchingIndex = possibleMatches.indexOf(color);
      possibleMatches = possibleMatches.filter(function (_, i) {return matchingIndex !== i;});
      correct.push(index);
    }
  });

  //Check for right color
  guess.forEach(function (color, index) {
    const matchingIndex = possibleMatches.indexOf(color);
    if (matchingIndex !== -1 && !correct.includes(index)) {
      possibleMatches = possibleMatches.filter(function (_, i) {return matchingIndex !== i;});
      almost.push(index);
    }
  });

  //transforms
  correct = correct.map(() => 'black');
  almost = almost.map(() => 'white');

  return shuffle(correct.concat(almost));
}
