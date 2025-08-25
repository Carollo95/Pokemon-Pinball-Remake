function preload() {
  preLoadBackgrounds();
  preloadAnimations();
  
  this._incrementPreload();
  preloadAudioAssets().then(() => this._decrementPreload());
}

function setup() {
  //Create canvas and asign it to its div on html
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  //Start I18N
  let userLang = navigator.language || navigator.userLanguage;
  I18NManager.setLanguage(userLang);

  //Init physics
  EngineUtils.initPhysics();

  // Start level
  startSealStage();
}

function draw() {
  EngineUtils.drawStage();
}

function showFPS() {
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, 10);
}


function startGhostStage() {
  allSprites.remove();
  stage = new BonusStageGhost();
  stage.setup();
}

function startMoleStage() {
  allSprites.remove();
  stage = new BonusStageMole();
  stage.setup();
}

function startCatStage() {
  allSprites.remove();
  stage = new BonusStageCat();
  stage.setup();
}

function startSealStage() {
  allSprites.remove();
  stage = new BonusStageSeal();
  stage.setup();
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ghost-stage").addEventListener("click", startGhostStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("mole-stage").addEventListener("click", startMoleStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cat-stage").addEventListener("click", startCatStage);
});
