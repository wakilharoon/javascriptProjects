"use strict";

const btcButton = document.querySelector("#btc-btn");
const ethButton = document.querySelector("#eth-btn");
const xrpButton = document.querySelector("#xrp-btn");

const allButtons = document.querySelectorAll(".btn");

const btcModal = document.querySelector("#btc-modal");
const ethModal = document.querySelector("#eth-modal");
const xrpModal = document.querySelector("#xrp-modal");

const closeButtons = document.querySelectorAll(".close-modal");

const overlay = document.querySelector(".overlay");

let currentModal;

function showModal(modal) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  currentModal = modal;
}

function hideModal() {
  currentModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (e) {
    if (allButtons[i].id === btcButton.id) showModal(btcModal);
    if (allButtons[i].id === ethButton.id) showModal(ethModal);
    if (allButtons[i].id === xrpButton.id) showModal(xrpModal);
  });
}

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

overlay.addEventListener("click", hideModal);

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    currentModal !== undefined &&
    !currentModal.classList.contains("hidden")
  )
    hideModal();
});
