let GASTLY1_SPAWN_X = 70;
let GASTLY1_SPAWN_Y = 140;
let GASTLY2_SPAWN_X = 200;
let GASTLY2_SPAWN_Y = 203;
let GASTLY3_SPAWN_X = 159;
let GASTLY3_SPAWN_Y = 280;

let HAUNTER1_SPAWN_X = 65;
let HAUNTER1_SPAWN_Y = 235;
let HAUNTER2_SPAWN_X = 233;
let HAUNTER2_SPAWN_Y = 167;

let GENGAR_SPAWN_X = SCREEN_WIDTH / 2;
let GENGAR_SPAWN_Y = 120;


let gastly1, gastly2, gastly3;
let haunter1, haunter2;
let gengar;

let extraGastlyLives = 0;//7;
let extraHaunterLives = 2;//10;

let level_completed=false;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  bg = loadImage(BONUS_GHOST_BACKGROUND);

  world.gravity.y = GRAVITY;

  createScenario();
  createGhosts();

  createBonusFlippers()
  spawnBonusBall();
}

function createGhosts() {
  gastly1 = new Gastly(GASTLY1_SPAWN_X, GASTLY1_SPAWN_Y);
  gastly2 = new Gastly(GASTLY2_SPAWN_X, GASTLY2_SPAWN_Y);
  gastly3 = new Gastly(GASTLY3_SPAWN_X, GASTLY3_SPAWN_Y);

  //Disabled until its time comes
  haunter1 = new Haunter(HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y);
  haunter1.disableScript();
  haunter2 = new Haunter(HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y);
  haunter2.disableScript();

  //Disabled until its time comes
  gengar = new Gastly(GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
  gengar.disableScript();
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

  //TODO reenable after testing
  /*     grave1 = createGrave(88, 225);
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
  } else if (extraHaunterLives > 0 || !haunter1.isDisabled() || !haunter2.isDisabled()) {
    haunter1 = updateHaunter(haunter1);
    haunter2 = updateHaunter(haunter2);
  } else if (!level_completed || !gengar.isDisabled()) {
    gengar = updateGengar();
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

function updateHaunter(haunter) {
  haunter.update();

  if (extraHaunterLives > 0 && haunter.readyToRespawn()) {
    haunter = new Haunter(haunter.start_x, haunter.start_y);
    extraHaunterLives -= 1;
  }

  return haunter;
}

function updateGengar() {
  gengar.update();

  if (gengar.readyToRespawn()) {
    gengar = new Gengar(gengar.start_x, gengar.start_y);
    level_completed = true;
  }

  return gengar;
}
