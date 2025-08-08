let stage;

function setup() {
  stage = new BonusStageGhost();
  stage.setup();
}


function draw() {
  stage.draw();
  if (DEBUG) {
    showFPS();
  }
}

function showFPS() {
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, 10);
}

