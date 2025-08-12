const GHOST_STAGE_TIME_MILLIS = 91000; //Duration of the ghost stage

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

  scenarioTop;
  scenarioRight;
  scenarioLeft;
  gravestone1;
  gravestone2;
  gravestone3;
  gravestone4;

  extraGastlyLives = 7;
  extraHaunterLives = 10;

  currentPhase; // 0 setup, 1 gastly, 2 haunter & 3 gengar

  wrapUp = false;

  millisSinceStageComplete = 0;

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(bonusGhostBackgroundClosed);
    this.createScenarioGeometry();

    this.currentPhase = 0;
  }

  createScenarioGeometry() {


    this.scenarioTop = new Sprite(
      [[0, 0],
      [SCREEN_WIDTH, 0],
      [SCREEN_WIDTH, 212],
      [373, 212],
      [332, 236],
      [332, 122],
      [44, 122],
      [44, 275],
      [0, 275],
      [0, 0]
      ], "static");
    this.scenarioTop.debug = DEBUG;
    this.scenarioTop.visible = DEBUG;

    this.scenarioRight = new Sprite([
      [SCREEN_WIDTH, 212],
      [SCREEN_WIDTH, SCREEN_HEIGHT],
      [236, SCREEN_HEIGHT],
      [236, 338],
      [373, 246],
      [373, 212],
      [SCREEN_WIDTH, 212]
    ], "static");

    this.scenarioRight.debug = DEBUG;
    this.scenarioRight.visible = DEBUG;

    this.scenarioLeft = new Sprite([
      [0, 275],
      [44, 275],
      [139, 338],
      [139, SCREEN_HEIGHT],
      [0, SCREEN_HEIGHT],
      [0, 275]
    ], "static");

    this.scenarioLeft.debug = DEBUG;
    this.scenarioLeft.visible = DEBUG;

    this.gravestone1 = this.createGravestone(88, 225);
    this.gravestone2 = this.createGravestone(152, 176);
    this.gravestone3 = this.createGravestone(264, 160);
    this.gravestone4 = this.createGravestone(247, 240);

    super.createGate();
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
    this.drawStage();

    if (this.isStageLost || this.isStageWon) {
      if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
        //TODO end stage
      }
    }
  }

  drawStage() {
    this.createBonusNewBallIfBallLoss(this.getOpenGateBackground())
    super.closeBonusGateIfBallInsideBoard(this.getBackground())

    this.updatePhaseSprites();
    this.updateGravestoneCollisions()
    if (this.scenarioTop.collide(this.ball.sprite)) {
      sfx08.play();
    }

    this.timer.update();

    if (this.timer.timeIsUp()) {
      this.flippers.disableFlippers();
    }

    this.changePhaseIfNecessary();
  }

  createBonusNewBallIfBallLoss(bonusGateBackground) {
    if (this.checkBonusBallLoss() && !this.levelCompleted) {
      if (!this.timer.timeIsUp()) {
        this.createNewBonusBall(bonusGateBackground);
      } else {
        if (!this.isStageLost && this.millisSinceStageComplete == 0) {
          this.millisSinceStageComplete = millis();
          this.stageText.setText(" end stage clear  ", (STAGE_RESULT_SHOW_MILLS / 2));
          this.isStageLost = true;
        }
      }
    }
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
      return bonusGhostBackgroundP2Closed;
    }

    return bonusGhostBackgroundClosed;
  }

  getOpenGateBackground() {
    if (this.currentPhase == 3) {
      return bonusGhostBackgroundP2Open;
    }
    return bonusGhostBackgroundOpen;
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
    if (this.gengar.disabled && !this.isStageWon) { // Wait until gengar walks backwards out of the stage
      this.clearStage();
    }
  }

  clearStage() {
    sfx2A.play();
    this.isStageWon = true;
    this.millisSinceStageComplete = millis();
    this.stageText.setText("gengar stage clear ", (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
  }


}