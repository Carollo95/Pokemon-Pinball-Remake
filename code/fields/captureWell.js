class CaptureWell {

    constructor(eatCallback) {
        this.sprite = this.getSprite();
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;

        this.eatCallback = eatCallback;

        this.well = this.getWell();
        this.gravityActive = true;
    }

    update(ballSprite) {
        if (this.gravityActive) {
            this.well.applyGravity(ballSprite)
        }
        if (this.sprite.ani.name === 'idle' && this.well.capturedBall(ballSprite)) {
            this.sprite.changeAni('eat');
            Audio.playSFX(this.getEatSFX());
            ballSprite.visible = false;
            this.sprite.ani.onComplete = () => {
                this.eatCallback();
                this.gravityActive = false;
                this.sprite.changeAni('spit');
                Audio.playSFX(this.getSpitSFX());
                ballSprite.visible = true;
                this.sprite.ani.onComplete = () => {
                    this.sprite.changeAni('idle');
                    this.gravityActive = true;
                }
            }
        }
    }


}