const state = {
  barState: "normal",
  value: 30,
};

const animateToggle = document.querySelector(".animate-toggle");
const hideToggle = document.querySelector(".hide-toggle");
const inputValue = document.querySelector(".input-value");

const circularProgressBar = document.querySelector(".circular-progress-bar");
const progressCircle = document.querySelector(".progress-circle");
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const renderSettings = () => {
  switch (state.barState) {
    case "normal":
      if (animateToggle.classList.contains("active-toggle")) {
        animateToggle.classList.remove("active-toggle");
      }
      if (hideToggle.classList.contains("active-toggle")) {
        hideToggle.classList.remove("active-toggle");
      }
      inputValue.value = state.value;
      break;
    case "animated":
      if (!animateToggle.classList.contains("active-toggle")) {
        animateToggle.classList.add("active-toggle");
      }
      if (hideToggle.classList.contains("active-toggle")) {
        hideToggle.classList.remove("active-toggle");
      }
      inputValue.value = state.value;
      break;
    case "hidden":
      if (animateToggle.classList.contains("active-toggle")) {
        animateToggle.classList.remove("active-toggle");
      }
      if (!hideToggle.classList.contains("active-toggle")) {
        hideToggle.classList.add("active-toggle");
      }
      inputValue.value = state.value;
      break;
    default:
      break;
  }
};

const renderProgress = () => {
  progressCircle.style.transition = "all 0.4s";
  circularProgressBar.style.opacity = 1;
  const offset = circumference - (state.value / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
  switch (state.barState) {
    case "normal":
      progressCircle.style.transform = `rotate(-90deg)`;
      break;
    case "animated":
      progressCircle.style.transition = "none";
      if (!state.loop) {
        let angle = -90;
        const loop = setInterval(() => {
          angle === 270 ? (angle = -90) : (angle += 1);
          progressCircle.style.transform = `rotate(${angle}deg)`;
        });
        state.loop = loop;
      }
      break;
    case "hidden":
      progressCircle.style.transform = `rotate(-90deg)`;
      circularProgressBar.style.opacity = 0;
      break;
    default:
      break;
  }
};

const clearLoop = () => {
  if (state.loop) {
    clearInterval(state.loop);
    state.loop = null;
  }
};

const render = () => {
  renderProgress();
  renderSettings();
};

const initialRender = () => {
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  renderProgress();
  renderSettings();
};

animateToggle.addEventListener("click", () => {
  clearLoop();
  state.barState === "animated"
    ? (state.barState = "normal")
    : (state.barState = "animated");
  render();
});

hideToggle.addEventListener("click", () => {
  clearLoop();
  state.barState === "hidden"
    ? (state.barState = "normal")
    : (state.barState = "hidden");
  render();
});

inputValue.addEventListener("change", (e) => {
  if (e.target.value > 100) {
    state.value = 100;
  } else if (e.target.value < 0 || e.target.value === "") {
    state.value = 0;
  } else state.value = e.target.value;
  render();
});

initialRender();
