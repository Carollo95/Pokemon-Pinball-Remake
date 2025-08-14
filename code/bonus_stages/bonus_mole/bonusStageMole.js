class BonusStageMole extends BonusStage {

  diglettMatrix;

  constructor() {
    super();
  }

  setup() {
    super.replaceBackground(bonusMoleBackgroundOpen);
    super.createBonusScenarioGeometry();

    this.createDigletts();

    playSong(songMoleStageDiglett);
  }

  createDigletts() {
    let timeOfDiggletCreation = millis();
    let diglettColumn0 = [];
    diglettColumn0[0] = new Diglett(60, 166, timeOfDiggletCreation, 100);
    diglettColumn0[1] = new Diglett(60, 198, timeOfDiggletCreation, 200);
    diglettColumn0[2] = new Diglett(60, 230, timeOfDiggletCreation, 300);

    let diglettColumn1 = [];
    diglettColumn1[0] = new Diglett(92, 182, timeOfDiggletCreation, 200);
    diglettColumn1[1] = new Diglett(92, 214, timeOfDiggletCreation, 300);
    diglettColumn1[2] = new Diglett(92, 246, timeOfDiggletCreation, 400);

    let diglettColumn2 = [];
    diglettColumn2[0] = new Diglett(124, 166, timeOfDiggletCreation, 300);
    diglettColumn2[1] = new Diglett(124, 198, timeOfDiggletCreation, 400);
    diglettColumn2[2] = new Diglett(124, 230, timeOfDiggletCreation, 500);
    diglettColumn2[3] = new Diglett(124, 262, timeOfDiggletCreation, 600);

    let diglettColumn3 = [];
    diglettColumn3[0] = new Diglett(156, 182, timeOfDiggletCreation, 400);
    diglettColumn3[1] = new Diglett(156, 214, timeOfDiggletCreation, 500);
    diglettColumn3[2] = new Diglett(156, 246, timeOfDiggletCreation, 600);
    diglettColumn3[3] = new Diglett(156, 278, timeOfDiggletCreation, 700);

    let diglettColumn4 = [];
    diglettColumn4[0] = new Diglett(188, 198, timeOfDiggletCreation, 500);
    diglettColumn4[1] = new Diglett(188, 230, timeOfDiggletCreation, 600);
    diglettColumn4[2] = new Diglett(188, 262, timeOfDiggletCreation, 700);

    let diglettColumn5 = [];
    diglettColumn5[0] = new Diglett(220, 182, timeOfDiggletCreation, 400);
    diglettColumn5[1] = new Diglett(220, 214, timeOfDiggletCreation, 500);
    diglettColumn5[2] = new Diglett(220, 246, timeOfDiggletCreation, 600);
    diglettColumn5[3] = new Diglett(220, 278, timeOfDiggletCreation, 700);

    let diglettColumn6 = [];
    diglettColumn6[0] = new Diglett(252, 164, timeOfDiggletCreation, 300);
    diglettColumn6[1] = new Diglett(252, 198, timeOfDiggletCreation, 400);
    diglettColumn6[2] = new Diglett(252, 230, timeOfDiggletCreation, 500);
    diglettColumn6[3] = new Diglett(252, 262, timeOfDiggletCreation, 600);

    let diglettColumn7 = [];
    diglettColumn7[0] = new Diglett(284, 182, timeOfDiggletCreation, 200);
    diglettColumn7[1] = new Diglett(284, 214, timeOfDiggletCreation, 300);
    diglettColumn7[2] = new Diglett(284, 246, timeOfDiggletCreation, 400);

    let diglettColumn8 = [];
    diglettColumn8[0] = new Diglett(316, 164, timeOfDiggletCreation, 100);
    diglettColumn8[1] = new Diglett(316, 198, timeOfDiggletCreation, 200);
    diglettColumn8[2] = new Diglett(316, 230, timeOfDiggletCreation, 300);

    this.diglettMatrix = [diglettColumn0, diglettColumn1, diglettColumn2, diglettColumn3, diglettColumn4, diglettColumn5, diglettColumn6, diglettColumn7, diglettColumn8];
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
    if (this.checkIfPhaseChange()) {
      console.log("DUGTRIO TIME");
    }

    if (this.scenarioTop.collide(this.ball.sprite)) {
      sfx08.play();
    }

  }

  updatePhaseSprites() {
    for (let i = 0; i < this.diglettMatrix.length; i++) {
      for (let j = 0; j < this.diglettMatrix[i].length; j++) {
        this.diglettMatrix[i][j].update(this.ball.sprite);
      }
    }
  }

  checkIfPhaseChange() {
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
