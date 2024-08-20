//@ts-check
"use strict";

// Util functions
/**
 * @param {string} el
 * @returns {HTMLElement|null}
 */
const $ = (el) => document.querySelector(el);

/**
 * @param {number} ms
 * @returns
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Elements
const $red = $(".semaforo :nth-child(1)");
const $yellow = $(".semaforo :nth-child(2)");
const $green = $(".semaforo :nth-child(3)");
const $toggleButton = $("#toggle");

// Constants & Variables
const ON = "1";
const OFF = "0.3";
const DURATION = 3000;
let animate = false;


// Events
const toggleAnimationHandler = () => {
  animate = !animate;
};

const animateHandler = () => {
  if ($red && $yellow && $green && $toggleButton) {
    if (animate) {
      $toggleButton.style.color = "rgb(0, 255, 0)";
      $toggleButton.textContent = "ON";
      $green.animate(
        { opacity: [ON, OFF, OFF] },
        { duration: DURATION, iterations: Infinity }
      );
      $yellow.animate(
        { opacity: [OFF, ON, OFF] },
        { duration: DURATION, iterations: Infinity }
      );
      $red.animate(
        { opacity: [OFF, OFF, ON] },
        { duration: DURATION, iterations: Infinity }
      );
    } else {
      $toggleButton.style.color = "rgb(255, 0, 0)";
      $toggleButton.textContent = "OFF";
      $red.getAnimations().forEach((animation) => animation.cancel());
      $yellow.getAnimations().forEach((animation) => animation.cancel());
      $green.getAnimations().forEach((animation) => animation.cancel());
    }
  }
};

$toggleButton?.addEventListener("click", () => {
  toggleAnimationHandler();
  animateHandler();
});


