const VICTORY_STAGE_PEARLS = 20;
const SEAL_MULTIPLIER_THRESHOLD_MS = 3000;
const SEAL_STAGE_TIME_MILLIS = 91000;
const SEAL_1_X = 280;
const SEAL_1_Y = 160;
const SEAL_2_X = 90;
const SEAL_2_Y = 212;
const SEAL_3_X = 216;
const SEAL_3_Y = 266;

const SEAL_LAST_ACTION = {
    SEAL_HIT: "hit",
    SEAL_DIVE: "dive"
}

class BonusStageSeal extends BonusStage {

    constructor(status) {
        super(status);
        this.millisSinceStageComplete = 0;
        this.state = BONUS_STAGE_STATE.PLAYING;

        this.lastAction = SEAL_LAST_ACTION.SEAL_DIVE;

        this.playableStages = [BONUS_STAGE_STATE.PLAYING, BONUS_STAGE_STATE.WON];

        this.seal1 = new Seal(SEAL_1_X, SEAL_1_Y, this.onDiveCallback);
        this.seal2 = new Seal(SEAL_2_X, SEAL_2_Y, this.onDiveCallback, false);
        this.seal3 = new Seal(SEAL_3_X, SEAL_3_Y, this.onDiveCallback);

        this.pearlCounter = new PearlCounter();

        this.pearlMultiplier = 1;
    }

    createBonusNewBallIfBallLoss(bonusGateBackground) {
        if (!this.playableStages.includes(this.state)) return;
        if (!this.checkBonusBallLoss()) return;

        this.createNewBonusBall(bonusGateBackground);
        this.applyBallLossPenalty();
    }
    
    applyBallLossPenalty() {
        this.seal1.swim();
        this.seal2.swim();
        this.seal3.swim();

        this.pearlMultiplier = 1;
        this.lastAction = SEAL_LAST_ACTION.SEAL_DIVE;
        this.pearlCounter.applyPenalty(4);
    }

    setup() {
        super.replaceBackground(Asset.getBackground('bonusSealBackgroundOpen'));
        super.createBonusScenarioGeometry();

        this.attachTimer(Timer.createBonusLowTimer(SEAL_STAGE_TIME_MILLIS));

        Audio.playMusic('sealStage');
    }

    draw() {
        super.draw();
        this.drawStage();

        if (this.state === BONUS_STAGE_STATE.LOST || (this.state === BONUS_STAGE_STATE.WON && super.checkBonusBallLoss())) {
            if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
                //TODO end stage
                console.log("LEVEL COMPLETE");
            }
        }
    }

    drawStage() {
        if (this.state === BONUS_STAGE_STATE.PLAYING) {
            this.createBonusNewBallIfBallLoss(Asset.getBackground('bonusSealBackgroundOpen'));
            super.closeBonusGateIfBallInsideBoard(Asset.getBackground('bonusSealBackgroundClosed'));
        }

        this.updateTimer();

        this.seal1.update(this.getBall().sprite, this.onHurtCallback, this.pearlMultiplier);
        this.seal2.update(this.getBall().sprite, this.onHurtCallback, this.pearlMultiplier);
        this.seal3.update(this.getBall().sprite, this.onHurtCallback, this.pearlMultiplier);

    }

    updateTimer() {
        this.getTimer().update();

        if (this.state !== BONUS_STAGE_STATE.LOST && this.getTimer().timeIsUp()) {
            this.endStage();
        }
    }

    endStage() {
        if (this.state !== BONUS_STAGE_STATE.WON) {
            super.endStage(BONUS_STAGE_STATE.LOST, "end_seal_stage");
        } else {
            this.finishStage();
        }
    }

    onDiveCallback = () => {
        this.lastAction = SEAL_LAST_ACTION.SEAL_DIVE;
        this.pearlMultiplier = 1;
    }


    onHurtCallback = () => {
        this.lastAction = SEAL_LAST_ACTION.SEAL_HIT;
        this.pearlCounter.addPearls(this.pearlMultiplier);
        this.addPoints(this.pearlMultiplier * POINTS.SEAL_HIT_POINTS);
        this.upgradePearlMultiplier();
        if (this.state === BONUS_STAGE_STATE.PLAYING && this.pearlCounter.getCount() >= VICTORY_STAGE_PEARLS) {
            this.clearStage();
        }
    }

    clearStage() {
        Audio.interruptWithSFX('sfx2A');

        this.state = BONUS_STAGE_STATE.WON;
        this.getStageText().setScrollText(I18NManager.translate("seal_stage_clear"), (STAGE_RESULT_SHOW_MILLS / 2));
    }

    upgradePearlMultiplier() {
        if (this.lastAction === SEAL_LAST_ACTION.SEAL_HIT) {
            this.pearlMultiplier *= 2;
            if (this.pearlMultiplier >= 512) {
                this.pearlMultiplier = 1;
            }
        }
    }

    finishStage() {
        this.getTimer().disable();
        this.getFlippers().disableFlippers();
        Audio.stopMusic();
        this.millisSinceStageComplete = millis();
    }

}