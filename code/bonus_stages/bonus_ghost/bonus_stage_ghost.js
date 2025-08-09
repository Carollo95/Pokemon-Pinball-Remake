const GHOST_STATE_TIME_MILLIS = 91000; //Duration of the ghost stage

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

class BonusStageGhost extends BonusStage {
  gastly1;
  gastly2;
  gastly3;
  haunter1;
  haunter2;
  gengar;

  scenario;
  gravestone1;
  gravestone2;
  gravestone3;
  gravestone4;

  extraGastlyLives = 0;//7;
  extraHaunterLives = 2;//10;

  currentPhase; // 0 setup, 1 gastly, 2 haunter & 3 gengar

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(BONUS_GHOST_BACKGROUND);

    world.gravity.y = GRAVITY;
    this.createScenario();
    this.ball = spawnBonusBall();
    this.flippers = createBonusFlippers();

    this.timer = new Timer(GHOST_STATE_TIME_MILLIS);

    this.currentPhase = 0;
  }

  createScenario() {
    this.scenario = new Sprite([[0, 0],
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
    this.scenario.debug = DEBUG;
    this.scenario.visible = DEBUG;

    this.gravestone1 = this.createGravestone(88, 225);
    this.gravestone2 = this.createGravestone(152, 176);
    this.gravestone3 = this.createGravestone(264, 160);
    this.gravestone4 = this.createGravestone(247, 240);

    this.createGate();
  }

  createGate() {
    this.gate = new Sprite(337, 254, 10, 39, "static");
    this.gate.debug = DEBUG;
    this.gate.visible = DEBUG;
    disableSprite(this.gate);
  }

  createGravestone(x, y) {
    let width = 26;
    let height = 26;
    let grave = new Sprite([
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

  draw() {
    super.draw();

    super.createBonusNewBallIfBallLoss(this.getOpenGateBackground())
    super.closeBonusGateIfBallInsideBoard(this.getBackground())

    this.flippers.update();

    this.updatePhaseSprites();
    this.updateGravestoneCollisions()
    this.timer.update();

    if (this.timer.timeIsUp()) {
      this.loseBonusStage();
      console.log("Bonus stage ended");
    }

    this.changePhaseIfNecessary();

  }

  updateGravestoneCollisions() {
    this.updateGravestoneCollision(this.gravestone1);
    this.updateGravestoneCollision(this.gravestone2);
    this.updateGravestoneCollision(this.gravestone3);
    this.updateGravestoneCollision(this.gravestone4);
  }

  updateGravestoneCollision(gravestone) {
    if (gravestone.collide(this.ball.sprite)) {
      sfx2F.play();
    }
  }


  updatePhaseSprites() {
    if (this.currentPhase == 1) {
      this.gastly1 = this.updateGastly(this.gastly1);
      this.gastly2 = this.updateGastly(this.gastly2);
      this.gastly3 = this.updateGastly(this.gastly3);
    } else if (this.currentPhase == 2) {
      this.haunter1 = this.updateHaunter(this.haunter1);
      this.haunter2 = this.updateHaunter(this.haunter2);
    } else if (this.currentPhase == 3) {
      this.gengar = this.updateGengar();
    }
  }

  changePhaseIfNecessary() {
    if (this.checkIfTimeForANewPhase()) {
      if (this.currentPhase == 0) {
        this.setupGastlyPhase();
        this.currentPhase = 1;
      } else if (this.currentPhase == 1) {
        this.currentPhase = 2;
        this.setupHaunterPhase();
      } else if (this.currentPhase == 2) {
        this.currentPhase = 3;
        this.setupGengarPhase();
      }
    }
  }

  setupGastlyPhase() {
    this.gastly1 = new Gastly(GASTLY1_SPAWN_X, GASTLY1_SPAWN_Y);
    this.gastly2 = new Gastly(GASTLY2_SPAWN_X, GASTLY2_SPAWN_Y);
    this.gastly3 = new Gastly(GASTLY3_SPAWN_X, GASTLY3_SPAWN_Y);

    playSong(songGhostStageGastly);
  }

  setupHaunterPhase() {
    this.haunter1 = this.createDisabledGhost(Haunter, HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y);
    this.haunter2 = this.createDisabledGhost(Haunter, HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y);

    playSong(songGhostStageHaunter);
  }

  createDisabledGhost(clazz, x, y) {
    let ghost = new clazz(x, y);
    ghost.disableSprite();

    playSong(songGhostStageGengar);

    return ghost;
  }

  setupGengarPhase() {
    super.replaceBackground(this.getBackground());
    super.startShake();
    this.gravestone1.remove();
    this.gravestone2.remove();
    this.gravestone3.remove();
    this.gravestone4.remove();

    this.gengar = this.createDisabledGhost(Gengar, GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
  }

  checkIfTimeForANewPhase() {
    if (this.currentPhase == 0
      || (this.currentPhase == 1 && this.gastlyPhaseFinished())
      || (this.currentPhase == 2 && this.haunterPhaseFinished())
      || (this.currentPhase == 3 && this.gengarPhaseFinished())) {
      return true;
    }
    return false;
  }

  gastlyPhaseFinished() {
    return this.extraGastlyLives == 0 && this.gastly1.disabled && this.gastly2.disabled && this.gastly3.disabled;
  }

  haunterPhaseFinished() {
    return this.extraHaunterLives == 0 && this.haunter1.disabled && this.haunter2.disabled;
  }

  gengarPhaseFinished() {
    return this.gengar.hitPoints == 0;
  }

  getBackground() {
    if (this.currentPhase == 3) {
      return BONUS_GHOST_BACKGROUND_P2;
    }

    return BONUS_GHOST_BACKGROUND;
  }

  getOpenGateBackground() {
    if (this.currentPhase == 3) {
      return BONUS_GHOST_BACKGROUND_OPEN_P2;
    }
    return BONUS_GHOST_BACKGROUND_OPEN;
  }

  updateGastly(gastly) {
    gastly.update(this.ball.sprite);

    if (this.extraGastlyLives > 0 && gastly.readyToRespawn()) {
      gastly = new Gastly(gastly.start_x, gastly.start_y);
      this.extraGastlyLives -= 1;
    }

    return gastly;
  }

  updateHaunter(haunter) {
    haunter.update(this.ball.sprite);

    if (this.extraHaunterLives > 0 && haunter.readyToRespawn()) {
      haunter = new Haunter(haunter.start_x, haunter.start_y);
      this.extraHaunterLives -= 1;
    }

    return haunter;
  }

  updateGengar() {
    this.gengar.update(this.ball.sprite);

    if (this.gengar.isDefeated()) {
      this.finishStageSucessfully();
    } else if (this.gengar.readyToRespawn()) {
      console.log(this.gengar.hitPoints);
      this.gengar = new Gengar(GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
      sfx4E.play();
    }

    return this.gengar;
  }

  finishStageSucessfully() {
    stopMusic();
    this.timer.disable();
    this.flippers.disableFlippers();
    this.levelCompleted = true;
    if (this.gengar.disabled) {
      console.log("Bonus complete");
    }

  }


}