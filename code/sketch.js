let bg;
let gate;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  bg = loadImage(BONUS_GHOST_BACKGROUND);

  createScenario();
  createBonusFlippers()
  spawnBonusBall();

  world.gravity.y = GRAVITY;

}

function createScenario() {
  scenario = new Sprite([[0, 0],
  [SCREEN_WIDTH, 0],
  [SCREEN_WIDTH, SCREEN_HEIGHT],
  [236, SCREEN_HEIGHT],
  [236, 338],
  [373, 246],
  [373, 212],
  [332, 236],
  [332, 122],
  [44, 122],
  [44, 275],
  [139, 338],
  [139, SCREEN_HEIGHT],
  [0, SCREEN_HEIGHT],
  [0, 0]], "static");
  scenario.debug = DEBUG;

  grave1 = new Sprite(100, 246, 46, 20, "static");
  grave1.debug = DEBUG;

  grave2 = new Sprite(164, 198, 46, 20, "static");
  grave2.debug = DEBUG;

  grave3 = new Sprite(276, 182, 46, 20, "static");
  grave3.debug = DEBUG;

  grave4 = new Sprite(260, 262, 46, 20, "static");
  grave4.debug = DEBUG;
  //TODO make invisible

  gate = new Sprite(337, 254, 10, 39, "static");
  disableScript(gate);
  gate.debug = DEBUG;
}

function draw() {
  background(bg);

  createBonusNewBallIfBallLoss()
  closeBonusGateIfBallInsideBoard()

  controlLeftFlipper();
  controlRightFlipper();
}
