
class BonusStageCat extends BonusStage {

    constructor() {
        super();
    }

    setup() {
        super.replaceBackground(bonusCatBackgroundOpen);
        super.createBonusScenarioGeometry();

        playSong(songCatStage);

        this.meowth = new Meowth();
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
        super.createBonusNewBallIfBallLoss(bonusCatBackgroundOpen);
        super.closeBonusGateIfBallInsideBoard(bonusCatBackgroundClosed);

        this.meowth.update();

        if (this.scenarioTop.collide(this.ball.sprite)) {
            sfx08.play();
        }

    }



}