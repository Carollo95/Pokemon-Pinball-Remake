import "./p5setup.js";
const planckModule = await import("planck");
window.planck = planckModule.default ?? planckModule;
await import("p5play");

import {EngineUtils, SCREEN_HEIGHT, SCREEN_WIDTH} from "./engine/engine.js";
import {initializeMainPageContent} from "./mainPageContent.js";
import {I18NManager} from "./engine/i18nManager.js";
import {preloadAnimations, preLoadBackgrounds} from "./engine/assetManager.js";
import {preloadAudioAssets} from "./engine/audioManager.js";

function preload() {
  preLoadBackgrounds();
  preloadAnimations();

  this._incrementPreload();
  preloadAudioAssets().then(() => this._decrementPreload());
}

function setup() {
  // Quick fix to reduce spritesheet bleeding
  pixelDensity(1);
  noSmooth();
  //Create canvas and asign it to its div on html
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  // Ensure the 2D context doesn't smooth scaled images
  drawingContext.imageSmoothingEnabled = false;

  //Start I18N
  let userLang = navigator.language || navigator.userLanguage;
  I18NManager.setLanguage(userLang);

  initializeMainPageContent();

  //Init physics
  EngineUtils.initPhysics();

  // Start level
  EngineUtils.startMainMenu();
}

function draw() {
  EngineUtils.drawStage();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

new p5();
