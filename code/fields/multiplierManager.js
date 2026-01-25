const MULTIPLIER_STATE = {
    LEFT_BLINK: 'leftBlink',
    RIGHT_BLINK: 'rightBlink',
    BOTH_BLINK: 'bothBlink',
}

const MULTIPLIER_ANIMATION_DURATION_MS = 3000;

class MultiplierManager {

    constructor(status, onLeftMultiplierHitCallback, onRightMultiplierHitCallback, onMultiplierUpgradeCallback, leftMultiplier, rightMultiplier) {
        this.status = status;
        this.onLeftMultiplierHitCallback = onLeftMultiplierHitCallback;
        this.onRightMultiplierHitCallback = onRightMultiplierHitCallback;
        this.onMultiplierUpgradeCallback = onMultiplierUpgradeCallback;

        this.leftMultiplier = leftMultiplier;
        this.rightMultiplier = rightMultiplier;

        this._lastmultiplierUpgradeTime = -MULTIPLIER_ANIMATION_DURATION_MS;
        this.setInitialState();
    }

    setInitialState() {
        this.multiplier = 1;
        this.leftMultiplier.blink();
        this.leftMultiplier.setNumber(0);
        this.rightMultiplier.turnOff();
        this.rightMultiplier.setNumber(2);
        this.state = MULTIPLIER_STATE.LEFT_BLINK;
    }

    update(ballSprite) {
        if (this.state === MULTIPLIER_STATE.BOTH_BLINK && this.animationFinished()) {
            this.state = MULTIPLIER_STATE.LEFT_BLINK;
        }
        this.leftMultiplier.update(ballSprite);
        this.rightMultiplier.update(ballSprite);
    }

    animationFinished() {
        return millis() - this._lastmultiplierUpgradeTime >= MULTIPLIER_ANIMATION_DURATION_MS;
    }

    leftMultiplierHitCallback = () => {
        this.onLeftMultiplierHitCallback();

        if (this.state === MULTIPLIER_STATE.LEFT_BLINK) {
            this.state = MULTIPLIER_STATE.RIGHT_BLINK;
            this.leftMultiplier.turnOff();
            this.rightMultiplier.blink();

            EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_MULTIPLIER_LIGHT_UP);
        }
    }

    rightMultiplierHitCallback = () => {
        this.onRightMultiplierHitCallback();

        if (this.state === MULTIPLIER_STATE.RIGHT_BLINK) {
            this.state = MULTIPLIER_STATE.BOTH_BLINK;
            this.leftMultiplier.blink();
            this.rightMultiplier.blink();
            this.upgradeMultiplier();

            EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_MULTIPLIER_MATCH_UP);
        }
    }

    upgradeMultiplier() {
        this.setMultiplierLevel(this.multiplier + 1);
        this._lastmultiplierUpgradeTime = millis();
        this.onMultiplierUpgradeCallback();
    }

    setMultiplierLevel(level) {
        if (level !== undefined) {
            this.multiplier = level;
            let nextMultiplier = this.multiplier + 1;
            this.leftMultiplier.setNumber(Math.floor(nextMultiplier / 10));
            this.rightMultiplier.setNumber(nextMultiplier % 10);

        }
    }

}