const MEWTWO_POS_X = 189;
const MEWTWO_POS_Y = 136;

class BonusStageClone extends BonusStage {

  constructor() {
    super();

    this.state = BONUS_STAGE_STATE.PLAYING;
    this.mewtwo = new Mewtwo(MEWTWO_POS_X, MEWTWO_POS_Y);

  }

  setup() {
    super.replaceBackground(Asset.getBackground('bonusCloneBackgroundOpen'));
    super.createBonusScenarioGeometry(true);

    Audio.playMusic('cloneStage');
  }

  draw() {
    super.draw();
    this.drawStage();
  }

  drawStage() {
    if (this.state === BONUS_STAGE_STATE.PLAYING) {
      super.createBonusNewBallIfBallLoss(this.getOpenGateBackground());
      super.closeBonusGateIfBallInsideBoard(this.getBackground());
    }

    this.mewtwo.update(this.getBall().sprite);
  }

  getBackground() {
    return Asset.getBackground('bonusCloneBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusCloneBackgroundOpen');
  }

}
