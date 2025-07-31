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
  scenario.visible = DEBUG;

  grave1 = createGrave(88, 225);
  grave2 = createGrave(152, 176);
  grave3 = createGrave(264, 160);
  grave4 = createGrave(247, 240);

  createGate();
}

function createGate(){
  gate = new Sprite(337, 254, 10, 39, "static");
  gate.debug = DEBUG;
  gate.visible = DEBUG;
  disableScript(gate);
}

function createGrave(x, y) {
  let width = 26;
  let height = 26;
  grave = new Sprite([
    [x, y],
    [x + width / 2, y - 5],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y]], "static");
  grave.debug = DEBUG;
  grave.visible = DEBUG;

  return grave;
}

function draw() {
  background(bg);

  createBonusNewBallIfBallLoss()
  closeBonusGateIfBallInsideBoard()

  controlLeftFlipper();
  controlRightFlipper();
}
