const MEWTWO_POS_X = 188;
const MEWTWO_POS_Y = 136;

class BonusStageClone extends BonusStage {

  constructor() {
    super();

    this.state = BONUS_STAGE_STATE.PLAYING;
    this.mewtwo = new Mewtwo(MEWTWO_POS_X, MEWTWO_POS_Y);

    this.shields = [];
    this.createShields();
  }

  createShields() {
    for (const point of this.mewtwo.getShieldPoints()) {
      this.shields.push(new Shield(point[0], point[1]));
    }
  }

  destroyShields(){
    for (const shield of this.shields) {
      shield.disable();
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
    this.destroyShields();
    this.createShields();
  }

  getBackground() {
    return Asset.getBackground('bonusCloneBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusCloneBackgroundOpen');
  }

}
