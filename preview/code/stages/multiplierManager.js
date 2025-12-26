const MULTIPLIER_STATE = {
    LEFT_BLINK: 'leftBlink',
    RIGHT_BLINK: 'rightBlink',
    BOTH_BLINK: 'bothBlink',
}

const MULTIPLIER_ANIMATION_DURATION_MS = 3000;

class MultiplierManager {

    constructor(onLeftMultiplierHitCallback, onRightMultiplierHitCallback, onMultiplierUpgradeCallback) {
        this.onLeftMultiplierHitCallback = onLeftMultiplierHitCallback;
        this.onRightMultiplierHitCallback = onRightMultiplierHitCallback;
        this.onMultiplierUpgradeCallback = onMultiplierUpgradeCallback;

        this.leftMultiplier = new MultiplierTarget(85, 298, 75, 281, this.leftMultiplierHitCallback);
        this.rightMultiplier = new MultiplierTarget(233, 298, 245, 281, this.rightMultiplierHitCallback);

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
        }
    }

    rightMultiplierHitCallback = () => {
        this.onRightMultiplierHitCallback();

        if (this.state === MULTIPLIER_STATE.RIGHT_BLINK) {
            this.state = MULTIPLIER_STATE.BOTH_BLINK;
            this.leftMultiplier.blink();
            this.rightMultiplier.blink();
            this.upgradeMultiplier();
        }
    }

    upgradeMultiplier() {
        this.multiplier += 1;
        let nextMultiplier = this.multiplier + 1;
        this.leftMultiplier.setNumber(Math.floor(nextMultiplier / 10));
        this.rightMultiplier.setNumber(nextMultiplier % 10);
        this._lastmultiplierUpgradeTime = millis();
        this.onMultiplierUpgradeCallback();
    }

}