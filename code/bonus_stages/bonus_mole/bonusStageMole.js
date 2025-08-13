class BonusStageMole extends BonusStage {

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(bonusMoleBackgroundClosed);
    super.createScenarioGeometry();
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
    this.createBonusNewBallIfBallLoss()
    super.closeBonusGateIfBallInsideBoard(this.getBackground())

    this.updatePhaseSprites();

    if (this.scenarioTop.collide(this.ball.sprite)) {
      sfx08.play();
    }

  }

  updatePhaseSprites() {

  }

  createBonusNewBallIfBallLoss() {
    if (this.checkBonusBallLoss() && !this.levelCompleted) {
      if (!this.isStageLost) {
      
        this.stageText.setText(" end stage clear  ", (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
        this.isStageLost = true;
      }
    }
  }

  getBackground() {
    return bonusMoleBackgroundClosed;
  }

  getOpenGateBackground() {
    return bonusMoleBackgroundOpen;
  }

}
