const DIGLETT_HIT_POINTS = 1000000;
const DUGTRIO_HIT_POINTS = 50000000;

const MOLE_PHASE = {
  DIGLETTS: 0,
  DUGTRIO: 1,
  COMPLETE: 2
};

class BonusStageMole extends BonusStage {

  constructor(status) {
    super(status);
    this.phase = MOLE_PHASE.DIGLETTS;
    this.millisSinceStageComplete = 0;

    this.diglettMatrix = [];
    this.dugtrio = null;
  }

  setup() {
    super.replaceBackground(Asset.getBackground('bonusMoleBackgroundOpen'));
    super.createBonusScenarioGeometry(true);

    this.createDigletts();
    this.dugtrio = new Dugtrio(188, 130, () => {this.addPoints(DUGTRIO_HIT_POINTS);});

    Audio.playMusic('moleDiglett');
  }

  createDigletts() {
    const timeOfDiggletCreation = millis();

    const diglettConfig = [
      [60, [166, 198, 230], [100, 200, 300]],
      [92, [182, 214, 246], [200, 300, 400]],
      [124, [166, 198, 230, 262], [300, 400, 500, 600]],
      [156, [182, 214, 246, 278], [400, 500, 600, 700]],
      [188, [198, 230, 262], [500, 600, 700]],
      [220, [182, 214, 246, 278], [400, 500, 600, 700]],
      [252, [164, 198, 230, 262], [300, 400, 500, 600]],
      [284, [182, 214, 246], [200, 300, 400]],
      [316, [164, 198, 230], [100, 200, 300]]
    ];

    this.diglettMatrix = diglettConfig.map(([x, ys, delays]) =>
      ys.map((y, i) => new Diglett(x, y, timeOfDiggletCreation, delays[i],  () => {this.addPoints(DIGLETT_HIT_POINTS);} ))
    );
  }

  draw() {
    super.draw();
    this.drawStage();

    if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
      //TODO end stage
    }
  }

  drawStage() {
    if (this.state === BONUS_STAGE_STATE.PLAYING) {
      this.createBonusNewBallIfBallLoss(this.getOpenGateBackground());
      super.closeBonusGateIfBallInsideBoard(this.getBackground());
      this.changePhaseIfNeeded();
    }

    // update digletts always so animations continue on LOST/WON if desired
    if (this.phase === MOLE_PHASE.DIGLETTS) {
      for (let col = 0; col < this.diglettMatrix.length; col++) {
        for (let row = 0; row < this.diglettMatrix[col].length; row++) {
          this.diglettMatrix[col][row].update(this.getBall().sprite);
        }
      }
    }

    // dugtrio should update in PLAYING and LOST (so it can finish its exit animation)
    if (this.phase === MOLE_PHASE.DUGTRIO) {
      this.dugtrio.update(this.getBall().sprite);
    }

  }

  changePhaseIfNeeded() {
    if (this.phase === MOLE_PHASE.DIGLETTS && this.isPhaseChange()) {
      this.phase = MOLE_PHASE.DUGTRIO;
      Audio.playMusic('moleDugtrio');
      this.dugtrio.spawn();
      return;
    }

    if (this.phase === MOLE_PHASE.DUGTRIO && this.dugtrio.disabled) {
      this.endStage(BONUS_STAGE_STATE.WON, "diglett_stage_clear");
    }
  }

  isPhaseChange() {
    for (let i = 0; i < this.diglettMatrix.length; i++) {
      for (let j = 0; j < this.diglettMatrix[i].length; j++) {
        if (!this.diglettMatrix[i][j].disabled) {
          return false;
        }
      }
    }
    return true;
  }

  createBonusNewBallIfBallLoss() {
    // only when playing (createNewBonusBall already checks state in BonusStage)
    if (this.state !== BONUS_STAGE_STATE.PLAYING) return;
    if (!this.checkBonusBallLoss()) return;

    this.endStage(BONUS_STAGE_STATE.LOST, "end_diglett_stage");
  }

  getBackground() {
    return Asset.getBackground('bonusMoleBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusMoleBackgroundOpen');
  }

}
