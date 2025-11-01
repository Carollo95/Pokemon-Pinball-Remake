const SCREEN_STATE = {
    LANDSCAPE: "landscape",
    CAPTURE: "capture"
}



class Screen {
    constructor(
        captureStartCaptureAnimationCallback,
        captureStartAnimatedSpritePhaseCallback,
        captureCompleteAnimationStartedCallback,
        capturePhaseFinishedCallback,
        captureOnPokemonAnimatedHitCallback
    ) {
        this.screenLandscapes = new ScreenLandscapes();
        this.screenLandscapes.spinBW();

        this.capturePhaseFinishedCallback = capturePhaseFinishedCallback;
        this.screenCapture = new ScreenCapture(captureStartCaptureAnimationCallback, captureStartAnimatedSpritePhaseCallback, captureCompleteAnimationStartedCallback, this.onCapturePhaseFinishedCallback, captureOnPokemonAnimatedHitCallback);

        this.ballsSprite = new Sprite(160, 404, 96, 16, "none");
        this.ballsSprite.layer = SCENARIO_LAYER;
        this.ballsSprite.debug = DEBUG;
        this.ballsSprite.addAnimation('captured-ball', Asset.getAnimation('captured-ball'));
        this.ballsSprite.ani.playing = false;
        this.captureLevel = 0;
        this.ballsSprite.ani.frame = this.captureLevel;

        this.state = SCREEN_STATE.LANDSCAPE;
    }

    update(ballSprite) {
        if (this.state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.update();
        } else if (this.state === SCREEN_STATE.CAPTURE) {
            this.screenCapture.update(ballSprite);
        }

    }

    spinBW() {
        this.sprite.changeAnimation(AREA_MAP[this.area] + 'BW');
    }

    stopSpin() {
        this.screenLandscapes.stopSpin();
    }

    getLandmarkText() {
        return this.screenLandscapes.getLandmarkText();
    }

    progressArea() {
        this.screenLandscapes.progressArea();
    }

    setState(state) {
        this.state = state;
        if (state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.show(true);
            this.screenCapture.show(false)
            this.ballsSprite.visible = true;
        } else if (state === SCREEN_STATE.CAPTURE) {
            this.ballsSprite.visible = false;
            this.screenCapture.show(true);
            this.screenLandscapes.show(false);
        }
    }

    startCapture(level) {
        this.setState(SCREEN_STATE.CAPTURE);
        this.screenCapture.startCapture(this.screenLandscapes.getPokemonFromLandmark(level));
    }

    flipCapture() {
        if (this.state !== SCREEN_STATE.CAPTURE) return;

        this.screenCapture.flipCapture();
    }

    onCapturePhaseFinishedCallback = () => {
        this.setState(SCREEN_STATE.LANDSCAPE);
        this.screenCapture.hide();
        this.addPokeballsToList(1);
        this.capturePhaseFinishedCallback();
    }

    addPokeballsToList(num) {
        this.captureLevel = Math.min(this.captureLevel + num, 3);
        this.ballsSprite.ani.frame = this.captureLevel;
    }



}