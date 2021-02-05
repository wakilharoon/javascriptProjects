"use strict";

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const resetButton = document.querySelector("#btn--new");
const rollButton = document.querySelector("#btn--roll");
const holdButton = document.querySelector("#btn--hold");
let scores, currentScore, currentPlayer;

function init() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  hideElement(dice);
  showElement(rollButton);
  showElement(holdButton);
  const currentBoxes = document.querySelectorAll(".current");
  for (let i = 0; i < currentBoxes.length; i++) {
    showElement(currentBoxes[i]);
  }
}

init();

function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function toggleActivePlayerClass(player) {
  document.querySelector(player).classList.toggle("player--active");
}

function setCurrentScore(value) {
  document.querySelector(`#current--${currentPlayer}`).textContent = value;
}

function switchPlayer() {
  setCurrentScore(0);
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  toggleActivePlayerClass(".player--0");
  toggleActivePlayerClass(".player--1");
}

function rollDice() {
  const diceEyes = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceEyes}.png`;
  showElement(dice);
  return diceEyes;
}

function updateCurrentScore(diceEyes) {
  currentScore += diceEyes;
  setCurrentScore(currentScore);
}

function updateTotalScore() {
  scores[currentPlayer] += currentScore;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    scores[currentPlayer];
}

function checkForWin() {
  if (scores[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add("player--winner");
    toggleActivePlayerClass(`.player--${currentPlayer}`);
    hideElement(dice);
    hideElement(rollButton);
    hideElement(holdButton);
    const currentBoxes = document.querySelectorAll(".current");
    for (let i = 0; i < currentBoxes.length; i++) {
      hideElement(currentBoxes[i]);
    }
  } else {
    switchPlayer();
  }
}

rollButton.addEventListener("click", function () {
  const diceEyes = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceEyes}.png`;
  showElement(dice);
  diceEyes !== 1 ? updateCurrentScore(diceEyes) : switchPlayer();
});

holdButton.addEventListener("click", function () {
  updateTotalScore();
  checkForWin();
});

resetButton.addEventListener("click", init);
