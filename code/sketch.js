let HAUNTER1_SPAWN_X = 65;
let HAUNTER1_SPAWN_Y = 235;

let HAUNTER2_SPAWN_X = 233;
let HAUNTER2_SPAWN_Y = 167;

let gate;

let gastly1, gastly2, gastly3;
let haunter1, haunter2;

let extraGastlyLives = 7;
let extraHaunterLives = 10;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  bg = loadImage(BONUS_GHOST_BACKGROUND);

  world.gravity.y = GRAVITY;

  createScenario();

  gastly1 = new Gastly(70, 140);
  gastly2 = new Gastly(200, 203);
  gastly3 = new Gastly(159, 280);

  //Disabled until
  haunter1 = new Gastly(HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y);
  haunter1.disableScript()
  haunter2 = new Gastly(HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y);
  haunter2.disableScript()

  createBonusFlippers()
  spawnBonusBall();
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

  /*   grave1 = createGrave(88, 225);
    grave2 = createGrave(152, 176);
    grave3 = createGrave(264, 160);
    grave4 = createGrave(247, 240); */

  createGate();
}

function createGate() {
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
  
  if (extraGastlyLives > 0 || !gastly1.isDisabled() || !gastly2.isDisabled() || !gastly3.isDisabled()) {
    gastly1 = updateGastly(gastly1);
    gastly2 = updateGastly(gastly2);
    gastly3 = updateGastly(gastly3);
  } else {
    haunter1 = updateHaunter(haunter1);
    haunter2 = updateHaunter(haunter2);
  }

}

function updateGastly(gastly) {
  gastly.update();
  
  if (extraGastlyLives > 0 && gastly.readyToRespawn()) {
    gastly = new Gastly(gastly.start_x, gastly.start_y);
    extraGastlyLives -= 1;
  }

  return gastly;
}

function updateHaunter(gastly) {
  gastly.update();
  
  if (extraHaunterLives > 0 && gastly.readyToRespawn()) {
    gastly = new Gastly(gastly.start_x, gastly.start_y);
    extraHaunterLives -= 1;
  }

  return gastly;
}
