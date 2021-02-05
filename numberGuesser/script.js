"use strict";

// Colors
const green = "#60b347";
const red = "#ff4242";
const grey = "#222";

// Number output widths
const originalWidth = "4em";
const victoryWidth = "8em";

// Game variables
const maxNumber = 100;
const maxGuesses = 10;
let number = randomNumber();
let guessesLeft = maxGuesses;
let best = maxGuesses;

function randomNumber() {
  return Math.trunc(Math.random() * maxNumber + 1);
}

function updateGuessesLeftOutput() {
  document.querySelector(".score").textContent = guessesLeft;
}

function decreaseGuessesLeft() {
  guessesLeft--;
  updateGuessesLeftOutput();
}

function changeMessage(message) {
  document.querySelector(".message").textContent = message;
}

function failure() {
  changeBackgroundColor(red);
  changeMessage("You failed!");
  document.querySelector(".score").textContent = 0;
}

function wrongGuess(message) {
  if (guessesLeft > 1) {
    changeMessage(message);
    decreaseGuessesLeft();
  } else failure();
}

function changeBackgroundColor(color) {
  document.querySelector("body").style.backgroundColor = color;
}

function numberOutput(width, content) {
  document.querySelector(".number").style.width = width;
  document.querySelector(".number").textContent = content;
}

function newBest() {
  if (maxGuesses - guessesLeft < best) {
    best = maxGuesses - guessesLeft;
    document.querySelector(".highscore").textContent = best + " guesses";
  }
}

function guessButtonDisabled(status) {
  document.querySelector(".check").disabled = status;
}

function victory() {
  decreaseGuessesLeft();
  changeBackgroundColor(green);
  changeMessage("Correct!");
  numberOutput(victoryWidth, number);
  newBest();
  guessButtonDisabled(true);
}

// Making a guess
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess || guess < 0 || guess > maxNumber) changeMessage("Invalid guess!");
  else if (guess === number) victory();
  else if (guess > number) wrongGuess("Too HIGH!");
  else if (guess < number) wrongGuess("Too LOW!");
});

// Resetting the game
document.querySelector(".again").addEventListener("click", function () {
  guessesLeft = maxGuesses;
  updateGuessesLeftOutput();
  number = randomNumber();
  changeMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  changeBackgroundColor(grey);
  numberOutput(originalWidth, "?");
  guessButtonDisabled(false);
});
