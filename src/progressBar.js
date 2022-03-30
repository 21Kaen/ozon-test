export class ProgressBar {
  constructor(elements, defaultValue) {
    this.state = {
      barState: "normal",
      value: defaultValue,
    };
    this.animateToggle = elements.animateToggle;
    this.hideToggle = elements.hideToggle;
    this.inputValue = elements.inputValue;
    this.circularProgressBar = elements.circularProgressBar;
    this.progressCircle = elements.progressCircle;
    this.radius = this.progressCircle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;
    this.initialRender();
    this.animateToggle.addEventListener(
      "click",
      this.animateToggleHandler.bind(this)
    );
    this.hideToggle.addEventListener(
      "click",
      this.hideToggleHandler.bind(this)
    );
    this.inputValue.addEventListener("change", this.inputHandler.bind(this));
  }

  initialRender() {
    this.progressCircle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.render();
  }

  render() {
    this.renderProgress();
    this.renderSettings();
  }

  //Рендер круга прогресса

  renderProgress() {
    this.progressCircle.style.transition = "all 0.4s";
    this.circularProgressBar.style.opacity = 1;
    const offset =
      this.circumference - (this.state.value / 100) * this.circumference;
    this.progressCircle.style.strokeDashoffset = offset;
    switch (this.state.barState) {
      case "normal":
        this.progressCircle.style.transform = `rotate(-90deg)`;
        break;
      case "animated":
        // Производим постоянную ротацию окружности с помощью setInterval
        // И кладем ссылку на интервал в стейт для дальнейшей отчистки при смене состояния
        this.progressCircle.style.transition = "none";
        if (!this.state.loop) {
          let angle = -90;
          const loop = setInterval(() => {
            angle === 270 ? (angle = -90) : (angle += 1);
            this.progressCircle.style.transform = `rotate(${angle}deg)`;
          });
          this.state.loop = loop;
        }
        break;
      case "hidden":
        this.progressCircle.style.transform = `rotate(-90deg)`;
        this.circularProgressBar.style.opacity = 0;
        break;
      default:
        break;
    }
  }

  //Рендер настроек (инпут и свитчи)

  renderSettings() {
    this.inputValue.value = this.state.value;
    switch (this.state.barState) {
      case "normal":
        if (this.animateToggle.classList.contains("active-toggle")) {
          this.animateToggle.classList.remove("active-toggle");
        }
        if (this.hideToggle.classList.contains("active-toggle")) {
          this.hideToggle.classList.remove("active-toggle");
        }
        break;
      case "animated":
        if (!this.animateToggle.classList.contains("active-toggle")) {
          this.animateToggle.classList.add("active-toggle");
        }
        if (this.hideToggle.classList.contains("active-toggle")) {
          this.hideToggle.classList.remove("active-toggle");
        }
        break;
      case "hidden":
        if (this.animateToggle.classList.contains("active-toggle")) {
          this.animateToggle.classList.remove("active-toggle");
        }
        if (!this.hideToggle.classList.contains("active-toggle")) {
          this.hideToggle.classList.add("active-toggle");
        }
        break;
      default:
        break;
    }
  }
  // Очистка интервала
  clearLoop() {
    if (this.state.loop) {
      clearInterval(this.state.loop);
      console.log("cleared");
      this.state.loop = null;
    }
  }
  // Хендлеры для листенеров событий
  animateToggleHandler() {
    this.clearLoop();
    this.state.barState === "animated"
      ? (this.state.barState = "normal")
      : (this.state.barState = "animated");
    this.render();
  }

  hideToggleHandler() {
    this.clearLoop();
    this.state.barState === "hidden"
      ? (this.state.barState = "normal")
      : (this.state.barState = "hidden");
    this.render();
  }

  inputHandler(e) {
    if (e.target.value > 100) {
      this.state.value = 100;
    } else if (e.target.value < 0 || e.target.value === "") {
      this.state.value = 0;
    } else this.state.value = e.target.value;
    this.render();
  }

  setValue(value) {
    if (value > 100) {
      this.state.value = 100;
    } else if (value < 0 || value === "") {
      this.state.value = 0;
    } else this.state.value = value;
    this.render();
  }

  // API без перехода в противоположное состояние после нажатия на кнопку

  animateOff() {
    this.clearLoop();
    this.state.barState = "normal";
    this.render();
  }

  animateOn() {
    this.state.barState = "animated";
    this.render();
  }

  hideOff() {
    this.state.barState = "normal";
    this.render();
  }

  hideOn() {
    this.clearLoop();
    this.state.barState = "hidden";
    this.render();
  }

  toNormal() {
    this.clearLoop();
    this.state.barState = "normal";
    this.render();
  }
}
