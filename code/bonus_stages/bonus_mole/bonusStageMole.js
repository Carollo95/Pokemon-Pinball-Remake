class BonusStageMole extends BonusStage {

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(bonusMoleBackgroundClosed);
    super.createBonusScenarioGeometry();

    new Diglett(60, 170);
    new Diglett(60, 202);
    new Diglett(60, 234);

    new Diglett(92, 186);
    new Diglett(92, 218);
    new Diglett(92, 250);

    new Diglett(124, 170);
    new Diglett(124, 202);
    new Diglett(124, 234);
    new Diglett(124, 266);

    new Diglett(156, 186);
    new Diglett(156, 218);
    new Diglett(156, 250);
    new Diglett(156, 282);

    new Diglett(188, 202);
    new Diglett(188, 234);
    new Diglett(188, 266);

    new Diglett(220, 186);
    new Diglett(220, 218);
    new Diglett(220, 250);
    new Diglett(220, 282);

    new Diglett(252, 170);
    new Diglett(252, 202);
    new Diglett(252, 234);
    new Diglett(252, 266);

    new Diglett(284, 186);
    new Diglett(284, 218);
    new Diglett(284, 250);

    new Diglett(316, 170);
    new Diglett(316, 202);
    new Diglett(316, 234);

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
    [188, 100],
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

        this.stageText.setText(" end diglett stage ", (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
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
