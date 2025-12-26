const MULTIPLIER_STATE = {
    LEFT_BLINK: 'leftBlink',
    RIGHT_BLINK: 'rightBlink',
    BOTH_BLINK: 'bothBlink',
}

class MultiplierManager {

    constructor(onLeftMultiplierHitCallback, onRightMultiplierHitCallback) {
        this.onLeftMultiplierHitCallback = onLeftMultiplierHitCallback;
        this.onRightMultiplierHitCallback = onRightMultiplierHitCallback;

        this.leftMultiplier = new MultiplierTarget(85, 298, 75, 281, this.leftMultiplierHitCallback);
        this.rightMultiplier = new MultiplierTarget(233, 298, 245, 281, this.rightMultiplierHitCallback);

        this.setInitialState();
        this.status = MULTIPLIER_STATE.LEFT_BLINK;
    }

    setInitialState() {
        this.multiplier = 1;
        this.leftMultiplier.blink();
        this.leftMultiplier.setNumber(0);
        this.rightMultiplier.turnOff();
        this.rightMultiplier.setNumber(2);
    }

    update(ballSprite) {
        this.leftMultiplier.update(ballSprite);
        this.rightMultiplier.update(ballSprite);
    }


    leftMultiplierHitCallback = () => {
        this.onLeftMultiplierHitCallback();
    }

    rightMultiplierHitCallback = () => {
        this.onRightMultiplierHitCallback();
    }

}