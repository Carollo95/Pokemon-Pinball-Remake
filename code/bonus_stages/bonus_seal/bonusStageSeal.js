const SEAL_STAGE_TIME_MILLIS = 91000;
const SEAL_1_X = 280;
const SEAL_1_Y = 160;
const SEAL_2_X = 90;
const SEAL_2_Y = 212;
const SEAL_3_X = 216;
const SEAL_3_Y = 266;

class BonusStageSeal extends BonusStage {

    constructor() {
        super();
        this.millisSinceStageComplete = 0;
        this.state = BONUS_STAGE_STATE.PLAYING;

        this.seal1 = new Seal(SEAL_1_X, SEAL_1_Y);
        this.seal2 = new Seal(SEAL_2_X, SEAL_2_Y, false);
        this.seal3 = new Seal(SEAL_3_X, SEAL_3_Y);

    }

    setup() {
        super.replaceBackground(Asset.getBackground('bonusSealBackgroundOpen'));
        super.createBonusScenarioGeometry();

        this.attachTimer(new Timer(TIMER_POSITION_BONUS_LOW_Y, SEAL_STAGE_TIME_MILLIS));

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

        this.getTimer().update();

        this.seal1.update(this.getBall().sprite);
        this.seal2.update(this.getBall().sprite);
        this.seal3.update(this.getBall().sprite);

    }

}