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

        this.catchTextSprite = new Sprite(160, 404, 96, 16, "none");
        this.catchTextSprite.layer = SCENARIO_LAYER;
        this.catchTextSprite.debug = DEBUG;
        this.catchTextSprite.addAnimation('captured-ball', Asset.getAnimation('captured-ball'));
        this.catchTextSprite.ani.playing = false;
        this.captureLevel = 0;
        this.catchTextSprite.ani.frame = this.captureLevel;

    }

    update(ballSprite) {
        //FIXME why do I need the state here to play the sound???
        if (this.state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.playSpinSound();
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
        this.screenLandscapes.show(state === SCREEN_STATE.LANDSCAPE);
        this.screenCapture.show(state === SCREEN_STATE.CAPTURE);
    }

    startCapture(num) {
        this.setState(SCREEN_STATE.CAPTURE);
        this.screenCapture.startCapture(num);
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
        this.captureLevel = (this.captureLevel + num) % 4;
        this.catchTextSprite.ani.frame = this.captureLevel;
    }



}