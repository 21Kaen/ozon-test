import { ProgressBar } from "./src/progressBar.js";

const elements = {
  animateToggle: document.querySelector(".animate-toggle"),
  hideToggle: document.querySelector(".hide-toggle"),
  inputValue: document.querySelector(".input-value"),
  circularProgressBar: document.querySelector(".circular-progress-bar"),
  progressCircle: document.querySelector(".progress-circle"),
};

const progressBar = new ProgressBar(elements, 30);
window.progressBar = progressBar;
