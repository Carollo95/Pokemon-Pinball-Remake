const RED_FIELD_ARROWS_BLINK_RATE = 30;
const RED_FIELD_ARROWS_BLINK_HALF_RATE = 15;

class RedFieldArrows {
    constructor() {
        this.captureArrows = new Sprite(244, 324, 44, 64, "none");
        this.captureArrows.debug = DEBUG;
        this.captureArrows.layer = SCENARIO_LAYER;
        this.captureArrows.addAni("captureAnimation", Asset.getAnimation("redFieldCaptureArrows"));
        this.captureArrows.ani.playing = false;
        this.setCaptureArrowsLevel(2);
    }

    update(visible) {
        this.blinkCaptureArrows(visible);
    }

    blinkCaptureArrows(visible) {
        if (visible) {
            if (this.captureArrowsLevel < 3) {
                frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                    this.captureArrows.ani.frame = this.captureArrowsLevel :
                    this.captureArrows.ani.frame = this.captureArrowsLevel + 1;
            }
        } else {
            this.captureArrows.ani.frame = 0;
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