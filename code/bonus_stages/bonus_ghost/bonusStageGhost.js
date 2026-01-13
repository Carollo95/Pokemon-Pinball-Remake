const GHOST_STAGE_TIME_MILLIS = 91000; //Duration of the ghost stage

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

  constructor(status, onEndCallback) {
    super(status, onEndCallback);

    // create and attach timer so Stage API exposes it
    this.attachTimer(Timer.createBonusHighTimer(GHOST_STAGE_TIME_MILLIS));

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

    EngineUtils.flashWhite();
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
    grave.layer = SCENARIO_LAYER;
    return grave;
  }

  draw() {
    super.draw();
    this.drawStage();

    if (this.state === BONUS_STAGE_STATE.WON || this.state === BONUS_STAGE_STATE.LOST) {
      if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
        super.finishStageSuccessfully();
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

    const key = resultState === BONUS_STAGE_STATE.WON ? "gengar_stage_clear" : "end_gengar_stage";
    this.getStageText().setScrollText(I18NManager.translate(key), "", (STAGE_RESULT_SHOW_MILLS / 2));

    Audio.playSFX('sfx2A');
  }

  updateGravestoneCollisions() {
    for (const gravestone of this.gravestones) {
      if (gravestone.collide(this.getBallSprite())) {
        Audio.playSFX('sfx2F');
        EngineUtils.addPointsForBallHelper(POINTS.GRAVESTONE_HIT_POINTS);
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
    this.gastly1 = new Gastly(GASTLY1_SPAWN_X, GASTLY1_SPAWN_Y, this.doOnGastlyHitCallback);
    this.gastly2 = new Gastly(GASTLY2_SPAWN_X, GASTLY2_SPAWN_Y, this.doOnGastlyHitCallback);
    this.gastly3 = new Gastly(GASTLY3_SPAWN_X, GASTLY3_SPAWN_Y, this.doOnGastlyHitCallback);

    Audio.playMusic('ghostGastly');
  }

  doOnGastlyHitCallback = () => {
    EngineUtils.addPointsForBallHelper(POINTS.GASTLY_DEFEATED_POINTS);
  }

  setupHaunterPhase() {
    this.haunter1 = this.createDisabledGhost(Haunter, HAUNTER1_SPAWN_X, HAUNTER1_SPAWN_Y, this.doOnHaunterHitCallback);
    this.haunter2 = this.createDisabledGhost(Haunter, HAUNTER2_SPAWN_X, HAUNTER2_SPAWN_Y, this.doOnHaunterHitCallback);

    Audio.playMusic('ghostHaunter');
  }

  doOnHaunterHitCallback = () => {
    EngineUtils.addPointsForBallHelper(POINTS.HAUNTER_DEFEATED_POINTS);
  }

  createDisabledGhost(clazz, x, y) {
    const ghost = new clazz(x, y);
    ghost.disableSprite && ghost.disableSprite();
    return ghost;
  }

  setupGengarPhase() {
    super.replaceBackground(Asset.getBackground('bonusGhostBackgroundP2Closed'));
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
      gastly = new Gastly(gastly.start_x, gastly.start_y, this.doOnGastlyHitCallback);
      this.extraGastlyLives -= 1;
    }

    return gastly;
  }

  updateHaunter(haunter) {
    haunter.update(this.getBallSprite());

    if (this.extraHaunterLives > 0 && haunter.readyToRespawn && haunter.readyToRespawn()) {
      haunter = new Haunter(haunter.start_x, haunter.start_y, this.doOnHaunterHitCallback);
      this.extraHaunterLives -= 1;
    }

    return haunter;
  }

  updateGengar() {
    this.gengar.update(this.getBallSprite());

    //TODO review this condition, why did I do this???
    if (this.gengar.isDefeated && this.gengar.isDefeated()) {
      this.finishGhostStageSuccessfully();
    } else if (this.gengar.readyToRespawn && this.gengar.readyToRespawn()) {
      this.gengar = new Gengar(GENGAR_SPAWN_X, GENGAR_SPAWN_Y, () => { EngineUtils.addPointsForBallHelper(POINTS.GENGAR_HIT_POINTS); });
      Audio.playCry('094');
    }

    return this.gengar;
  }

  finishGhostStageSuccessfully() {
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
    stageText.setScrollText(I18NManager.translate("gengar_stage_clear"), "", (STAGE_RESULT_SHOW_MILLS / 2));
  }

}