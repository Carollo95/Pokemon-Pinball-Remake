class BonusStageMole extends BonusStage {

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(bonusMoleBackgroundClosed);
    super.createBonusScenarioGeometry();
  }


  createScenarioTopGeometry() {
    this.scenarioTop = this.createScenarioGeometry([[0, 0],
    [SCREEN_WIDTH, 0],
    [SCREEN_WIDTH, 212],
    [373, 212],
    [336, 236],
    [336, 122],
    [222, 122],
    [216, 110],
    [188, 96],
    [162, 110],
    [156, 122],
    [40, 122],
    [40, 275],
    [0, 275],
    [0, 0]
    ]);
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
