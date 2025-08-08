function preload() {
  preloadAudio();
  preloadAnimations();
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
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

