const CHARGER_SPEED_DAMPING = 0.97;
const CHARGER_LOW_SPEED_THRESHOLD = 0.5;

const CHARGER_ANI_DELAY_MIN = 2;
const CHARGER_ANI_DELAY_MAX = 20;
const CHARGER_ANI_SPEED_MAX = 10;

class Charger {

    constructor(paddleX, paddleY, indicatorX, indicatorY, onFullChargeCallback) {
        this.paddleSprite = new Sprite(paddleX, paddleY, 28, 16, "none");
        this.paddleSprite.debug = DEBUG;
        this.paddleSprite.layer = SCENARIO_LAYER;

        this.paddleSprite.addAnimation('paddle', Asset.getAnimation('redFieldPaddle'));
        this.paddleSprite.ani.playing = false;
        this._lastPaddleFrame = 0;
        this.speed = 0;

        this.chargeIndicatorSprite = new Sprite(indicatorX, indicatorY, 36, 40, "none");
        this.chargeIndicatorSprite.debug = DEBUG;
        this.chargeIndicatorSprite.layer = SCENARIO_LAYER;

        this.chargeIndicatorSprite.addAnimation('chargeIndicator', Asset.getAnimation('redFieldChargeIndicator'));
        this.chargeIndicatorSprite.ani.playing = false;

        this.charge = 0;

        this.onFullChargeCallback = onFullChargeCallback;
    }


    update(ballSprite) {
        if (this.paddleSprite.overlaps(ballSprite)) {
            this.speed = Math.max(0, Math.floor(Math.abs(ballSprite.velocity.y)));
        } else if (this.speed > 0) {
            if (this.speed <= CHARGER_LOW_SPEED_THRESHOLD) {
                this.speed = 0;
            } else {
                this.speed *= CHARGER_SPEED_DAMPING;
            }
        }

        this.updatePaddleSpeed();

        if (this.paddleSprite.ani.playing && this.paddleSprite.ani.frame !== this._lastPaddleFrame) {
            this.addCharge();
            this._lastPaddleFrame = this.paddleSprite.ani.frame;
        }
    }

    updatePaddleSpeed() {
        if (this.speed <= CHARGER_LOW_SPEED_THRESHOLD) {
            this.paddleSprite.ani.playing = false;
        } else {
            this.paddleSprite.ani.frameDelay = this.getAnimationDelay();
            this.paddleSprite.ani.playing = true;
        }

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