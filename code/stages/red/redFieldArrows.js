class RedFieldArrows {
    constructor() {

        this.captureArrows = new Sprite(244, 324, 44, 64, "none");
        this.captureArrows.debug = DEBUG;
        this.captureArrows.layer = SCENARIO_LAYER;
        this.captureArrows.addAni("captureAnimation", Asset.getAnimation("redFieldCaptureArrows"));
        this.captureArrows.ani.playing = false;
        this.captureArrowsLevel = 0;
    }

    update() {

    }

    resetCaptureArrows() {
        this.captureArrowsLevel = 0;
        this.captureArrows.ani.frame = this.captureArrowsLevel;
    }

    upgradeCaptureArrows() {
        if (this.captureArrowsLevel < 3) {
            this.captureArrowsLevel++;
            this.captureArrows.ani.frame = this.captureArrowsLevel;
        }
    }

}