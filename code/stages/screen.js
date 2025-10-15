const SCREEN_STATE = {
    LANDSCAPE: "landscape",
    CAPTURE: "capture"
}



class Screen {
    constructor() {
        this.screenLandscapes = new ScreenLandscapes();
        this.screenLandscapes.spinBW();
        this.screenCapture = new ScreenCapture();
    }

    update() {
        //FIXME why do I need the state here to play the sound???
        if (this.state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.playSpinSound();
        } else if (this.state === SCREEN_STATE.CAPTURE) {
            this.screenCapture.update();
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


}