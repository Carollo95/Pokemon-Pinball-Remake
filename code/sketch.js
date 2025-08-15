function preload() {
  preloadAudio();
  preLoadBackgrounds();
  preloadAnimations();
}

function setup() {
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  startCatStage();
}

function draw() {
  drawStage();
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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ghost-stage").addEventListener("click", startGhostStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("mole-stage").addEventListener("click", startMoleStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cat-stage").addEventListener("click", startCatStage);
});


async function playIntro() {}