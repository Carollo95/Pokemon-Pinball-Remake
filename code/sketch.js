p5playConfig = {
  showIntro: false
};

function preload() {
  preloadAudio();
  preLoadBackgrounds();
  preloadAnimations();
}

function setup() {
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  stage = new BonusStageGhost();
  stage.setup();
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

