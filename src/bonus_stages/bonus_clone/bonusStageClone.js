import {Audio} from "../../engine/audioManager.js";
import {Asset} from "../../engine/assetManager.js";
import {BONUS_STAGE_STATE, BonusStage, STAGE_RESULT_SHOW_MILLS} from "../bonusStage.js";
import {Mewtwo} from "./mewtwo.js";
import {Timer} from "../../core/timer.js";
import {Shield} from "./shield.js";
import {EngineUtils} from "../../engine/engine.js";
import {POINTS} from "../../core/points.js";

const CLONE_STAGE_TIME_MILLIS = 121000;
const MEWTWO_POS_X = 188;
const MEWTWO_POS_Y = 136;

export class BonusStageClone extends BonusStage {

  constructor(status, onEndCallback) {
    super(status, onEndCallback);

    this.state = BONUS_STAGE_STATE.PLAYING;
    this.mewtwo = new Mewtwo(MEWTWO_POS_X, MEWTWO_POS_Y, this.doOnCheckCreateShield, this.doOnMewtwoDefeat);

    this.attachTimer(Timer.createBonusLowTimer(CLONE_STAGE_TIME_MILLIS));

    this.shields = [];
    this.createShields();
  }

  createShields() {
    for (const point of this.mewtwo.getShieldPoints()) {
      this.shields.push(new Shield(point[0], point[1], () => { EngineUtils.addPointsForBallHelper(POINTS.MEWTWO_SHIELD_HIT_POINTS); }));
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

    EngineUtils.flashWhite();
  }

  draw() {
    super.draw();
    this.drawStage();

    if (this.state === BONUS_STAGE_STATE.LOST || this.state === BONUS_STAGE_STATE.WON) {
      if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
        super.finishStageSuccessfully();
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
    EngineUtils.addPointsForBallHelper(POINTS.MEWTWO_HIT_POINTS);
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
    super.disableTimer();
    this.getFlippers().disableFlippers();
    Audio.stopMusic();
    this.millisSinceStageComplete = millis();
  }

}
