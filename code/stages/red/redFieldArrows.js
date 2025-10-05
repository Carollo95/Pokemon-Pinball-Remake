class RedFieldArrows {
    constructor() {
        this.captureArrows = new Sprite(244, 324, 44, 64, "none");
        this.captureArrows.debug = DEBUG;
        this.captureArrows.layer = SCENARIO_LAYER;
        this.captureArrows.addAni("captureAnimation", Asset.getAnimation("redFieldCaptureArrows"));
        this.captureArrows.ani.playing = false;
        this.setCaptureArrowsLevel(2);
    }

    update() {
        if(this.captureArrowsLevel <3){
            let rate = 30;
            let halfRate = rate / 2;
            frameCount % rate > halfRate ? this.captureArrows.ani.frame = this.captureArrowsLevel : this.captureArrows.ani.frame = this.captureArrowsLevel + 1;
        }
    }

    resetCaptureArrows() {
        this.setCaptureArrowsLevel(0);
    }

    setCaptureArrowsLevel(level) {
        this.captureArrowsLevel = level;
        this.captureArrows.ani.frame = this.captureArrowsLevel;
    }

    upgradeCaptureArrows() {
        if (this.captureArrowsLevel < 3) {
            this.captureArrowsLevel++;
            this.captureArrows.ani.frame = this.captureArrowsLevel;
        }
    }

}