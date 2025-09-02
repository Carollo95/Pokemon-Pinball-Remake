const MEWTWO_POS_X = 188;
const MEWTWO_POS_Y = 136;

class BonusStageClone extends BonusStage {

  constructor() {
    super();

    this.state = BONUS_STAGE_STATE.PLAYING;
    this.mewtwo = new Mewtwo(MEWTWO_POS_X, MEWTWO_POS_Y);

    this.shields = [];
    this.shields.push(new Shield(134, 136));
    this.shields.push(new Shield(161, 89));
    this.shields.push(new Shield(215, 89));
    this.shields.push(new Shield(242, 136));
    this.shields.push(new Shield(215, 183));
    this.shields.push(new Shield(161, 183));
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

    this.mewtwo.update(this.getBall().sprite, this.onMewtwoHurtCallback);
    for (const shield of this.shields) {
      shield.update(this.getBall().sprite);
    }
  }

  onMewtwoHurtCallback = () => {
    for (const shield of this.shields) {
      shield.temporaryDisable();
    }
  }

  getBackground() {
    return Asset.getBackground('bonusCloneBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusCloneBackgroundOpen');
  }

}
