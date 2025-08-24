const GHOST_STAGE_TIME_MILLIS = 201000; //Duration of the ghost stage

const GHOST_GRAVESTONE_HEIGHT = 26;
const GHOST_GRAVESTONE_WIDTH = 26;

const GHOST_PHASE = {
  INIT: 0,
  GASTLY: 1,
  HAUNTER: 2,
  GENGAR: 3
};

const GASTLY1_SPAWN_X = 80;
const GASTLY1_SPAWN_Y = 140;
const GASTLY2_SPAWN_X = 240;
const GASTLY2_SPAWN_Y = 203;
const GASTLY3_SPAWN_X = 159;
const GASTLY3_SPAWN_Y = 260;

const HAUNTER1_SPAWN_X = 90;
const HAUNTER1_SPAWN_Y = 235;
const HAUNTER2_SPAWN_X = 220;
const HAUNTER2_SPAWN_Y = 167;

const GENGAR_SPAWN_X = SCREEN_WIDTH / 2;
const GENGAR_SPAWN_Y = 120;

class BonusStageGhost extends BonusStage {

  constructor() {
    super();

    // create and attach timer so Stage API exposes it
    this.attachTimer(new Timer(TIMER_POSITION_BONUS_HIGH_Y, GHOST_STAGE_TIME_MILLIS));

    // canonical state/phase
    this.state = BONUS_STAGE_STATE.PLAYING;
    this.currentPhase = GHOST_PHASE.INIT;
    this.millisSinceStageComplete = 0;

    // lives / counters
    this.extraGastlyLives = 7;
    this.extraHaunterLives = 10;

    // entities (initialized to null)
    this.gastly1 = null;
    this.gastly2 = null;
    this.gastly3 = null;
    this.haunter1 = null;
    this.haunter2 = null;
    this.gengar = null;

    // geometry / helpers
    this.gravestones = [];
  }

  setup() {
    super.replaceBackground(Asset.getBackground('bonusGhostBackgroundOpen'));
    this.createBonusScenarioGeometry();

    this.currentPhase = GHOST_PHASE.INIT;
    this.state = BONUS_STAGE_STATE.PLAYING;

    this.createBonusNewBallIfBallLoss(this.getOpenGateBackground());
  }

  createBonusScenarioGeometry() {
    super.createBonusScenarioGeometry();
    this.gravestones = [
      this.createGravestone(88, 225),
      this.createGravestone(152, 176),
      this.createGravestone(264, 160),
      this.createGravestone(247, 240)
    ];
  }

  createGravestone(x, y) {
    const width = GHOST_GRAVESTONE_WIDTH;
    const height = GHOST_GRAVESTONE_HEIGHT;
    const grave = new Sprite(
      [
        [x, y],
        [x + width / 2, y - 5],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
        [x, y]
      ],
      "static"
    );
    grave.debug = DEBUG;
    grave.visible = DEBUG;
    return grave;
  }

  draw() {
    super.draw();
    this.drawStage();

    if (this.state === BONUS_STAGE_STATE.WON || this.state === BONUS_STAGE_STATE.LOST) {
      if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
        // TODO: end stage sequence (return to main stage, award points, etc.)
      }
    }
  }

  drawStage() {
    if (this.state === BONUS_STAGE_STATE.PLAYING) {
      this.createBonusNewBallIfBallLoss(this.getOpenGateBackground());
      super.closeBonusGateIfBallInsideBoard(this.getBackground());
    }

    if (this.state !== BONUS_STAGE_STATE.WON) {
      this.updatePhaseSprites();
      this.updateGravestoneCollisions();

      if (this.scenarioTop.collide(this.getBallSprite())) {
        Audio.playSFX('sfx08');
      }

      this.getTimer().update();

      if (this.getTimer().timeIsUp()) {
        this.getFlippers().disableFlippers();
      }

      this.changePhaseIfNecessary();
    }
  }

  createBonusNewBallIfBallLoss(bonusGateBackground) {
    if (this.state !== BONUS_STAGE_STATE.PLAYING) return;
    if (!this.checkBonusBallLoss()) return;

    if (this.getTimer().timeIsUp()) {
      if (this.millisSinceStageComplete === 0)
        this.endStage(BONUS_STAGE_STATE.LOST);
      return;
    }

    this.createNewBonusBall(bonusGateBackground);
  }

  loseStage() {
    this.endStage(BONUS_STAGE_STATE.LOST);
  }

  endStage(resultState) {
    Audio.stopMusic();
    this.getTimer().disable();
    this.getFlippers().disableFlippers();

    this.state = resultState;
    this.millisSinceStageComplete = millis();

    const key = resultState === BONUS_STAGE_STATE.WON ? "gengar_stage_cleared" : "end_gengar_stage";
    this.getStageText().setText(I18NManager.translate(key), (STAGE_RESULT_SHOW_MILLS / 2));

    Audio.playSFX('sfx2A');
  }

  updateGravestoneCollisions() {
    for (const gravestone of this.gravestones) {
      if (gravestone.collide(this.getBallSprite())) {
        Audio.playSFX('sfx2F');
        break;
      }
    }
  }

  updatePhaseSprites() {
    switch (this.currentPhase) {
      case GHOST_PHASE.GASTLY: {
        this.gastly1 = this.updateGastly(this.gastly1);
        this.gastly2 = this.updateGastly(this.gastly2);
        this.gastly3 = this.updateGastly(this.gastly3);
        break;
      }
      case GHOST_PHASE.HAUNTER: {
        this.haunter1 = this.updateHaunter(this.haunter1);
        this.haunter2 = this.updateHaunter(this.haunter2);
        break;
      }
      case GHOST_PHASE.GENGAR: {
        this.gengar = this.updateGengar();
        break;
      }
    }
  }

  changePhaseIfNecessary() {
    if (!this.checkIfTimeForANewPhase()) return;

    switch (this.currentPhase) {
      case GHOST_PHASE.INIT:
        this.setPhase(GHOST_PHASE.GASTLY);
        break;
      case GHOST_PHASE.GASTLY:
        this.setPhase(GHOST_PHASE.HAUNTER);
        break;
      case GHOST_PHASE.HAUNTER:
        this.setPhase(GHOST_PHASE.GENGAR);
        break;
    }
  }

  setPhase(newPhase) {
    if (this.currentPhase === newPhase) return;
    this.currentPhase = newPhase;
    switch (newPhase) {
      case GHOST_PHASE.GASTLY:
        this.setupGastlyPhase();
        break;
      case GHOST_PHASE.HAUNTER:
        this.setupHaunterPhase();
        break;
      case GHOST_PHASE.GENGAR:
        this.setupGengarPhase();
        break;
    }
  }

  setupGastlyPhase() {
    this.gastly1 = new Gastly(GASTLY1_SPAWN_X, GASTLY1_SPAWN_Y);
    this.gastly2 = new Gastly(GASTLY2_SPAWN_X, GASTLY2_SPAWN_Y);
    this.gastly3 = new Gastly(GASTLY3_SPAWN_X, GASTLY3_SPAWN_Y);

    Audio.playMusic('ghostGastly');
  }

  setupHaunterPhase() {
    this.haunter1 = this.createDisabledGhost(Haunter, HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y);
    this.haunter2 = this.createDisabledGhost(Haunter, HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y);

    Audio.playMusic('ghostHaunter');
  }

  createDisabledGhost(clazz, x, y) {
    const ghost = new clazz(x, y);
    ghost.disableSprite && ghost.disableSprite();
    return ghost;
  }

  setupGengarPhase() {
    super.replaceBackground(Asset.getBackground('bonusGhostBackgroundClosed'));
    super.startShake();

    this.gravestones.forEach(g => g.remove && g.remove());
    this.gravestones = [];

    this.gengar = this.createDisabledGhost(Gengar, GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
    Audio.playMusic('ghostGengar');
  }

  checkIfTimeForANewPhase() {
    if (this.currentPhase === GHOST_PHASE.INIT) return true;
    if (this.currentPhase === GHOST_PHASE.GASTLY && this.gastlyPhaseFinished()) return true;
    if (this.currentPhase === GHOST_PHASE.HAUNTER && this.haunterPhaseFinished()) return true;
    if (this.currentPhase === GHOST_PHASE.GENGAR && this.gengarPhaseFinished()) return true;
    return false;
  }

  gastlyPhaseFinished() {
    return this.extraGastlyLives === 0 &&
      this.gastly1 && this.gastly1.disabled &&
      this.gastly2 && this.gastly2.disabled &&
      this.gastly3 && this.gastly3.disabled;
  }

  haunterPhaseFinished() {
    return this.extraHaunterLives === 0 &&
      this.haunter1 && this.haunter1.disabled &&
      this.haunter2 && this.haunter2.disabled;
  }

  gengarPhaseFinished() {
    return this.gengar && this.gengar.hitPoints === 0;
  }

  getBackground() {
    if (this.currentPhase === GHOST_PHASE.GENGAR) {
      return Asset.getBackground('bonusGhostBackgroundP2Closed');
    }
    return Asset.getBackground('bonusGhostBackgroundClosed');
  }

  getOpenGateBackground() {
    if (this.currentPhase === GHOST_PHASE.GENGAR) {
      return Asset.getBackground('bonusGhostBackgroundP2Open');
    }
    return Asset.getBackground('bonusGhostBackgroundOpen');
  }

  updateGastly(gastly) {
    gastly.update(this.getBallSprite());

    if (this.extraGastlyLives > 0 && gastly.readyToRespawn && gastly.readyToRespawn()) {
      gastly = new Gastly(gastly.start_x, gastly.start_y);
      this.extraGastlyLives -= 1;
    }

    return gastly;
  }

  updateHaunter(haunter) {
    haunter.update(this.getBallSprite());

    if (this.extraHaunterLives > 0 && haunter.readyToRespawn && haunter.readyToRespawn()) {
      haunter = new Haunter(haunter.start_x, haunter.start_y);
      this.extraHaunterLives -= 1;
    }

    return haunter;
  }

  updateGengar() {
    this.gengar.update(this.getBallSprite());

    //TODO review this condition, why did I do this???
    if (this.gengar.isDefeated && this.gengar.isDefeated()) {
      this.finishStageSuccessfully();
    } else if (this.gengar.readyToRespawn && this.gengar.readyToRespawn()) {
      this.gengar = new Gengar(GENGAR_SPAWN_X, GENGAR_SPAWN_Y);
      Audio.playSFX('sfx4E');
    }

    return this.gengar;
  }

  finishStageSuccessfully() {
    Audio.stopMusic();
    this.getTimer().disable();
    this.getFlippers().disableFlippers();

    // if gengar already walked out (disabled) finalize immediately
    if (this.gengar && this.gengar.disabled) {
      this.endStage(BONUS_STAGE_STATE.WON);
    } else {
      // else mark wrap up and wait for gengar to finish its exit animation
      this.state = BONUS_STAGE_STATE.WRAP_UP;
    }
  }

  clearStage() {
    Audio.playSFX('sfx2A');
    this.state = BONUS_STAGE_STATE.WON;
    this.millisSinceStageComplete = millis();
    const stageText = this.getStageText();
    stageText.setText(I18NManager.translate("gengar_stage_cleared"), (STAGE_RESULT_SHOW_MILLS / 2));
  }

}