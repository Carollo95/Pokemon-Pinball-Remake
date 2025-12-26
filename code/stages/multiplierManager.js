class MultiplierManager {

    constructor(onLeftMultiplierHitCallback, onRightMultiplierHitCallback) {
        this.leftMultiplier = new MultiplierTarget(85, 298, 75, 281, this.leftMultiplierHitCallback);
        this.rightMultiplier = new MultiplierTarget(233, 298, 245, 281, this.rightMultiplierHitCallback);

        this.onLeftMultiplierHitCallback = onLeftMultiplierHitCallback;
        this.onRightMultiplierHitCallback = onRightMultiplierHitCallback;
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