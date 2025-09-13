const CLONE_STAGE_TIME_MILLIS = 121000;
const MEWTWO_POS_X = 188;
const MEWTWO_POS_Y = 136;

class BonusStageClone extends BonusStage {

  constructor(status) {
    super(status);

    this.state = BONUS_STAGE_STATE.PLAYING;
    this.mewtwo = new Mewtwo(MEWTWO_POS_X, MEWTWO_POS_Y, this.doOnCheckCreateShield, this.doOnMewtwoDefeat);

    this.attachTimer(new Timer(TIMER_POSITION_BONUS_LOW_Y, CLONE_STAGE_TIME_MILLIS));

    this.shields = [];
    this.createShields();
  }

  createShields() {
    for (const point of this.mewtwo.getShieldPoints()) {
      this.shields.push(new Shield(point[0], point[1]));
    }
  }

  destroyShields() {
    for (const shield of this.shields) {
      shield.remove();
    }
    this.shields = [];
  }

  setup() {
    super.replaceBackground(Asset.getBackground('bonusCloneBackgroundOpen'));
    super.createBonusScenarioGeometry(true);

    Audio.playMusic('cloneStage');
  }

  draw() {
    super.draw();
    this.drawStage();

    if (this.state === BONUS_STAGE_STATE.LOST || this.state === BONUS_STAGE_STATE.WON) {
      if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
        //TODO end stage
        console.log("Finish!");
      }
    }
  }

  drawStage() {
    if (this.state === BONUS_STAGE_STATE.PLAYING) {
      super.createBonusNewBallIfBallLoss(this.getOpenGateBackground());
      super.closeBonusGateIfBallInsideBoard(this.getBackground());
    }

    this.updateTimer();
    this.mewtwo.update(this.getBall().sprite, this.onMewtwoHurtCallback);
    for (const shield of this.shields) {
      shield.update(this.getBall().sprite);
    }
  }

  updateTimer() {
    this.getTimer().update();

    if (this.state !== BONUS_STAGE_STATE.LOST && this.getTimer().timeIsUp()) {
      this.getFlippers().disableFlippers();

      if (this.state !== BONUS_STAGE_STATE.WON) {
        this.endStage(BONUS_STAGE_STATE.LOST, "end_mewtwo_stage");
      } else {
        this.finishStage();
      }
    }
  }

  onMewtwoHurtCallback = () => {
    this.destroyShields();
    this.createShields();
  }

  getBackground() {
    return Asset.getBackground('bonusCloneBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusCloneBackgroundOpen');
  }

  doOnCheckCreateShield = () => {
    for (const shield of this.shields) {
      if (shield.disabled) {
        this.mewtwo.createShieldAnimation(shield);
        break;
      }
    }
  }

  doOnMewtwoDefeat = () => {
    this.destroyShields();
    this.endStage(BONUS_STAGE_STATE.WON, "mewtwo_stage_clear");
  }

  finishStage() {
    this.getTimer().disable();
    this.getFlippers().disableFlippers();
    Audio.stopMusic();
    this.millisSinceStageComplete = millis();
  }

}
