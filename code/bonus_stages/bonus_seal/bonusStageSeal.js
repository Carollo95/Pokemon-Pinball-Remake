class BonusStageSeal extends BonusStage {

    constructor() {
        super();
        this.millisSinceStageComplete = 0;
        this.state = BONUS_STAGE_STATE.PLAYING;
    }

    setup() {
        super.replaceBackground(Asset.getBackground('bonusSealBackgroundOpen'));
        super.createBonusScenarioGeometry();

        Audio.playMusic('sealStage');
    }

    draw() {
        super.draw();
        this.drawStage();
    }

    drawStage() {
        if (this.state === BONUS_STAGE_STATE.PLAYING) {
            super.createBonusNewBallIfBallLoss(Asset.getBackground('bonusSealBackgroundOpen'));
            super.closeBonusGateIfBallInsideBoard(Asset.getBackground('bonusSealBackgroundClosed'));
        }


    }

}