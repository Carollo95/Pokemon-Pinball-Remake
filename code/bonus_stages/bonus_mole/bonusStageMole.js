const SCENARIO_TOP_PORTION_POINTS = [
  [0, 0],
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
];

class BonusStageMole extends BonusStage {

  constructor() {
    super();
    this.diglettMatrix = [];
    this.phase = 0;
  }

  setup() {
    super.replaceBackground(bonusMoleBackgroundOpen);
    super.createBonusScenarioGeometry();

    this.createDigletts();
    this.dugtrio = new Dugtrio(188, 130);

    playSong(songMoleStageDiglett);
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
      ys.map((y, i) => new Diglett(x, y, timeOfDiggletCreation, delays[i]))
    );
  }


  //Overrided
  createScenarioTopGeometry() {
    this.scenarioTop = this.createScenarioGeometry(SCENARIO_TOP_PORTION_POINTS);
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
    this.changePhaseIfNeeded();

    if (this.scenarioTop.collide(this.ball.sprite)) {
      sfx08.play();
    }

  }

  changePhaseIfNeeded() {
    if (this.phase == 0 && this.isPhaseChange()) {
      this.phase++;
      playSong(songMoleStageDugtrio);
      this.dugtrio.spawn();
    } else if (this.dugtrio.disabled && !this.levelCompleted) {
      this.clearStage();
    }
  }

  clearStage() {
    stopMusic();
    sfx2A.play();
    this.isStageWon = true;
    this.millisSinceStageComplete = millis();
    this.levelCompleted = true;
    this.flippers.disableFlippers();
    this.stageText.setText(I18NManager.translate("diglett_stage_cleared"), (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
  }


  updatePhaseSprites() {
    for (let i = 0; i < this.diglettMatrix.length; i++) {
      for (let j = 0; j < this.diglettMatrix[i].length; j++) {
        this.diglettMatrix[i][j].update(this.ball.sprite);
      }
    }
    this.dugtrio.update(this.ball.sprite);
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
    if (this.checkBonusBallLoss() && !this.levelCompleted) {
      if (!this.isStageLost && !this.isStageWon) {
        this.loseStage();
      }
    }
  }

  loseStage() {
    this.stageText.setText(I18NManager.translate("end_diglett_stage"), (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
    this.isStageLost = true;
    this.flippers.disableFlippers();
    this.millisSinceStageComplete = millis();
  }

  getBackground() {
    return bonusMoleBackgroundClosed;
  }

  getOpenGateBackground() {
    return bonusMoleBackgroundOpen;
  }

}
