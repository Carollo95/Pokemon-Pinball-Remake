const MULTIPLIER_TARGET_COOLDOWN_TIME = 1000; // in milliseconds

const MULTIPLIER_BLINK_RATE = 40;
const MULTIPLIER_BLINK_HALF_RATE = MULTIPLIER_BLINK_RATE / 2;

class MultiplierTarget {


    constructor(collider, buttonSprite, displayX, displayY, callback) {
        this.sprite = new Sprite(displayX, displayY, 14, 14, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('active', this.getActiveMultiplierAnimation());
        this.sprite.ani.playing = false;
        this.sprite.addAnimation('inactive', this.getInactiveMultiplierAnimation());
        this.sprite.ani.playing = false;

        this.buttonSprite = buttonSprite;

        this.target = collider;
        this.target.debug = DEBUG;
        this.target.layer = SCENARIO_LAYER;
        this.target.visible = false;

        this._blinking = false;

        this.callback = callback;
        this.timer = new EventTimer(MULTIPLIER_TARGET_COOLDOWN_TIME);
    }


    update(ballSprite) {
        if (this.target.overlaps(ballSprite) && this.timer.hasElapsed()) {
            this.callback();
            this.timer.restart();
            Audio.playSFX('sfx0D');
            if (this.buttonSprite !== undefined) {
                this.buttonSprite.ani.playing = true;
                this.buttonSprite.ani.frame = 1;
                this.buttonSprite.ani.onComplete = () => {
                    this.buttonSprite.ani.playing = false;
                }
            }
        }

        if (this._blinking) {
            frameCount % MULTIPLIER_BLINK_RATE > MULTIPLIER_BLINK_HALF_RATE ?
                this.sprite.changeAni("active") :
                this.sprite.changeAni("inactive");
        }

    }

    blink() {
        this._blinking = true;
    }

    turnOn() {
        this._blinking = false;
        this.sprite.changeAni("active");
    }

    turnOff() {

        this._blinking = false;
        this.sprite.changeAni("inactive");
    }

    setNumber(number) {
        if (number < 10 && number >= 0) {
            this.sprite.animations['active'].frame = number;
            this.sprite.animations['inactive'].frame = number;
        }
    }

}