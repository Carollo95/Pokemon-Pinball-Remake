const CAVE_DETECTOR_BLINK_RATE = 30;
const CAVE_DETECTOR_BLINK_HALF_RATE = CAVE_DETECTOR_BLINK_RATE / 2;

const CAVE_DETECTOR_BLINK_DURATION = 1500;

class caveDetectorManager {

    constructor(onOpenCaveCallback) {
        this.detectorC = new CaveDetector(27, 419, 1);
        this.detectorA = new CaveDetector(59, 419, 2);
        this.detectorV = new CaveDetector(261, 419, 3);
        this.detectorE = new CaveDetector(293, 419, 4);
        this.onOpenCaveCallback = onOpenCaveCallback;
        this._onBlinkingAnimation = false;
        this.blinkCooldown = new CooldownTimer(CAVE_DETECTOR_BLINK_DURATION);
    }


    update(ballSprite) {
        if (this._onBlinkingAnimation) {
            let blinkActive = frameCount % CAVE_DETECTOR_BLINK_RATE > CAVE_DETECTOR_BLINK_HALF_RATE;
            this.detectorC.setActive(blinkActive);
            this.detectorA.setActive(blinkActive);
            this.detectorV.setActive(blinkActive);
            this.detectorE.setActive(blinkActive);

            if(this.blinkCooldown.hasCooldownElapsed()) {
                this._onBlinkingAnimation = false;
                this.onOpenCaveCallback();
            }
        } else {
            this.detectorC.update(ballSprite);
            this.detectorA.update(ballSprite);
            this.detectorV.update(ballSprite);
            this.detectorE.update(ballSprite);


            if (this.detectorC.active && this.detectorA.active && this.detectorV.active && this.detectorE.active) {
                this.blinkCooldown.restart();
                this._onBlinkingAnimation = true;
            }
        }
    }


    shiftLeft() {
        let pivot = this.detectorC.active;
        this.detectorC.setActive(this.detectorA.active);
        this.detectorA.setActive(this.detectorV.active);
        this.detectorV.setActive(this.detectorE.active);
        this.detectorE.setActive(pivot);
    }

    shiftRight() {
        let pivot = this.detectorE.active;
        this.detectorE.setActive(this.detectorV.active);
        this.detectorV.setActive(this.detectorA.active);
        this.detectorA.setActive(this.detectorC.active);
        this.detectorC.setActive(pivot);
    }

    reset() {
        this.detectorC.setActive(false);
        this.detectorA.setActive(false);
        this.detectorV.setActive(false);
        this.detectorE.setActive(false);
    }

}