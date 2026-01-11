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

            this.playAudioForChargeLevel();
            if (this.charge == 16) {
                {
                    this.onFullChargeCallback();
                    Audio.playSFX('sfx22');
                }
            }
        } else {
            Audio.playSFX('sfx11');
        }
    }

    playAudioForChargeLevel(){
        switch (this.charge) {
            case 1:
                Audio.playSFX('sfx12');
                break;
            case 2:
                Audio.playSFX('sfx13');
                break;
            case 3:
                Audio.playSFX('sfx14');
                break;
            case 4:
                Audio.playSFX('sfx15');
                break;
            case 5:
                Audio.playSFX('sfx16');
                break;
            case 6:
                Audio.playSFX('sfx17');
                break;
            case 7:
                Audio.playSFX('sfx18');
                break;
            case 8:
                Audio.playSFX('sfx19');
                break;
            case 9:
                Audio.playSFX('sfx1A');
                break;
            case 10:
                Audio.playSFX('sfx1B');
                break;
            case 11:
                Audio.playSFX('sfx1C');
                break;
            case 12:
                Audio.playSFX('sfx1D');
                break;
            case 13:
                Audio.playSFX('sfx1E');
                break;
            case 14:
                Audio.playSFX('sfx1F');
                break;
            case 15:
                Audio.playSFX('sfx20');
                break;
            default:
                break;
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

    setCharge(charge){
        this.charge = charge;
        this.chargeIndicatorSprite.ani.frame = this.charge;
    }

}