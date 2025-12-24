const CHARGER_SPEED_DAMPING = 0.97;
const CHARGER_LOW_SPEED_THRESHOLD = 0.5;

const CHARGER_ANI_DELAY_MIN = 2;
const CHARGER_ANI_DELAY_MAX = 20;
const CHARGER_ANI_SPEED_MAX = 10;

class Charger {

    constructor(spinnerX, spinnerY, indicatorX, indicatorY, onSpinnerMoveCallback, onFullChargeCallback) {
        this.spinnerSprite = new Sprite(spinnerX, spinnerY, 28, 16, "none");
        this.spinnerSprite.debug = DEBUG;
        this.spinnerSprite.layer = SCENARIO_LAYER;

        this.spinnerSprite.addAnimation('paddle', Asset.getAnimation('redFieldPaddle'));
        this.spinnerSprite.ani.playing = false;
        this._lastSpinnerFrame = 0;
        this.speed = 0;

        this.chargeIndicatorSprite = new Sprite(indicatorX, indicatorY, 36, 40, "none");
        this.chargeIndicatorSprite.debug = DEBUG;
        this.chargeIndicatorSprite.layer = SCENARIO_LAYER;

        this.chargeIndicatorSprite.addAnimation('chargeIndicator', Asset.getAnimation('redFieldChargeIndicator'));
        this.chargeIndicatorSprite.ani.playing = false;

        this.charge = 0;

        this.onSpinnerMoveCallback = onSpinnerMoveCallback;
        this.onFullChargeCallback = onFullChargeCallback;
    }


    update(ballSprite) {
        if (this.spinnerSprite.overlaps(ballSprite)) {
            this.speed = Math.max(0, Math.floor(Math.abs(ballSprite.velocity.y)));
        } else if (this.speed > 0) {
            if (this.speed <= CHARGER_LOW_SPEED_THRESHOLD) {
                this.speed = 0;
            } else {
                this.speed *= CHARGER_SPEED_DAMPING;
            }
        }

        this.updateSpinnerSpeed();

        if (this.spinnerSprite.ani.playing && this.spinnerSprite.ani.frame !== this._lastSpinnerFrame) {
            this.spinnerMove();
        }
    }

    updateSpinnerSpeed() {
        if (this.speed <= CHARGER_LOW_SPEED_THRESHOLD) {
            this.spinnerSprite.ani.playing = false;
        } else {
            this.spinnerSprite.ani.frameDelay = this.getAnimationDelay();
            this.spinnerSprite.ani.playing = true;
        }

    }

    spinnerMove() {
        this.onSpinnerMoveCallback();
        this.addCharge();
        this._lastSpinnerFrame = this.spinnerSprite.ani.frame;
    }

    addCharge() {
        if (!this.isFullyCharged()) {
            this.charge++;
            this.chargeIndicatorSprite.ani.frame = this.charge;

            if (this.charge == 16) {
                {
                    this.onFullChargeCallback();
                }
            }
        }
    }

    isFullyCharged() {
        return this.charge == 16;
    }

    discharge() {
        this.charge = 0;
        this.chargeIndicatorSprite.ani.frame = this.charge;
    }

    getAnimationDelay() {
        const minDelay = CHARGER_ANI_DELAY_MIN;
        const maxDelay = CHARGER_ANI_DELAY_MAX;
        const maxSpeed = CHARGER_ANI_SPEED_MAX;
        const s = Math.min(Math.max(this.speed, 0), maxSpeed);
        return Math.round(maxDelay - (maxDelay - minDelay) * (s / maxSpeed));
    }

}