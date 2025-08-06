let GASTLY1_SPAWN_X = 80;
let GASTLY1_SPAWN_Y = 140;
let GASTLY2_SPAWN_X = 240;
let GASTLY2_SPAWN_Y = 203;
let GASTLY3_SPAWN_X = 159;
let GASTLY3_SPAWN_Y = 260;

let HAUNTER1_SPAWN_X = 90;
let HAUNTER1_SPAWN_Y = 235;
let HAUNTER2_SPAWN_X = 220;
let HAUNTER2_SPAWN_Y = 167;

let GENGAR_SPAWN_X = SCREEN_WIDTH / 2;
let GENGAR_SPAWN_Y = 120;


let gastly1, gastly2, gastly3;
let haunter1, haunter2;
let gengar;

let extraGastlyLives = 0;//7;
let extraHaunterLives = 2;//10;

let currentPhase; // 0 setup, 1 gastly, 2 haunter & 3 gengar

let timer;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  replaceBackground(BONUS_GHOST_BACKGROUND);

  world.gravity.y = GRAVITY;
  createScenario();
  createBonusFlippers()
  spawnBonusBall();
  timer = new Timer(90000);

  currentPhase = 0;
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

function createGate() {
  gate = new Sprite(337, 254, 10, 39, "static");
  gate.debug = DEBUG;
  gate.visible = DEBUG;
  disableSprite(gate);
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
  //This is more engine stuff, maybe move?
  clear();
  image(bg, 0, 0, width, height);
  shake();

  timer.update();
  createBonusNewBallIfBallLoss(getOpenGateBackground())
  closeBonusGateIfBallInsideBoard(getBackground())

  controlLeftFlipper();
  controlRightFlipper();

  updatePhaseSprites();

  changePhaseIfNecessary();

}

function updatePhaseSprites() {
  if (currentPhase == 1) {
    gastly1 = updateGastly(gastly1);
    gastly2 = updateGastly(gastly2);
    gastly3 = updateGastly(gastly3);
  } else if (currentPhase == 2) {
    haunter1 = updateHaunter(haunter1);
    haunter2 = updateHaunter(haunter2);
  } else if (currentPhase == 3) {
    gengar = updateGengar();
  }
}

function changePhaseIfNecessary() {
  if (checkIfTimeForANewPhase()) {
    if (currentPhase == 0) {
      setupGastlyPhase();
      currentPhase = 1;
    } else if (currentPhase == 1) {
      currentPhase = 2;
      setupHaunterPhase();
    } else if (currentPhase == 2) {
      currentPhase = 3;
      setupGengarPhase();
    }
  }
}

function setupGastlyPhase() {
  gastly1 = new Gastly(GASTLY1_SPAWN_X, GASTLY1_SPAWN_Y);
  gastly2 = new Gastly(GASTLY2_SPAWN_X, GASTLY2_SPAWN_Y);
  gastly3 = new Gastly(GASTLY3_SPAWN_X, GASTLY3_SPAWN_Y);
}

function setupHaunterPhase() {
  haunter1 = createDisabledGhost(Haunter, HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y);
  haunter2 = createDisabledGhost(Haunter, HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y);
}

function createDisabledGhost(clazz, x, y) {
  let ghost = new clazz(x, y);
  ghost.disableSprite();
  return ghost;
}

function setupGengarPhase() {
  replaceBackground(getBackground());
  startShake();
  grave1.remove();
  grave2.remove();
  grave3.remove();
  grave4.remove();

  gengar = createDisabledGhost(Gengar, GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
}

function checkIfTimeForANewPhase() {
  if (currentPhase == 0
    || (currentPhase == 1 && gastlyPhaseFinished())
    || (currentPhase == 2 && haunterPhaseFinished())
    || (currentPhase == 3 && gengarPhaseFinished())) {
    return true;
  }
  return false;
}

function gastlyPhaseFinished() {
  return extraGastlyLives == 0 && gastly1.disabled && gastly2.disabled && gastly3.disabled;
}

function haunterPhaseFinished() {
  return extraHaunterLives == 0 && haunter1.disabled && haunter2.disabled;
}

function gengarPhaseFinished() {
  return gengar.hitPoints == 0;
}

function getBackground() {
  if (currentPhase == 3) {
    return BONUS_GHOST_BACKGROUND_P2;
  }

  return BONUS_GHOST_BACKGROUND;
}

function getOpenGateBackground() {
  if (currentPhase == 3) {
    return BONUS_GHOST_BACKGROUND_OPEN_P2;
  }
  return BONUS_GHOST_BACKGROUND_OPEN;
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

  if (gengar.hitPoints == 0) {
    levelCompleted = true;
    disableFlippers();
    if (gengar.disabled) {
      console.log("Bonus complete");
    }
  } else if (gengar.readyToRespawn()) {
    gengar = new Gengar(GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
  }

  return gengar;
}
