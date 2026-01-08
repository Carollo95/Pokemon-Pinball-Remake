const VOLTORB_MIN_VELOCITY_BOUNCE_THRESHOLD = 0.4;
const VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_STRONG = -1.8;
const VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_WEAK = -1.3;

const VOLTORB_SHAKE_TIME = 1000;
const VOLTORB_SHAKE_DURATION = 200;
const VOLTORB_COOLDOWN_TIME = 1100;

const STATE = {
    STILL: 0,
    SHAKE: 1
}


class RedFieldVoltorb {

    constructor(x, y, onHitCallback) {
        this.x = x;
        this.shakeX = this.x + 4;
        this.y = y;
        this.onHitCallback = onHitCallback;
        this.sprite = new Sprite(x, y, 28, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;
        this.lastHitTimer = new EventTimer(VOLTORB_COOLDOWN_TIME);
        this.nextShakeTime = this.getNextShakeTime();
        this.state = STATE.STILL;

        this.sprite.addAni('hurt', Asset.getAnimation('redFieldVoltorbHurt'));
        this.sprite.addAni('idle', Asset.getAnimation('redFieldVoltorbIdle'));
    }

    update(ball) {
        if (this.sprite.collide(ball) && this.lastHitTimer.hasElapsed()) {

            this.bounceBall(ball);
            this.onHitCallback();
            this.sprite.changeAnimation("hurt");
            Audio.playSFX('sfx0E');

            this.lastHitTimer.restart();
            this.nextShakeTime = millis();

            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;
            this.sprite.ani.onComplete = () => {
                this.sprite.changeAnimation('idle');
                this.nextShakeTime = this.getNextShakeTime();
            };
        }

        this.updateShake();
    }

    getNextShakeTime() {
        return millis() + VOLTORB_SHAKE_TIME + random(1000, 2000);
    }

    updateShake() {
        const now = millis();
        // start shake
        if (now >= this.nextShakeTime) {
            this.shakeStartTime = now;
            this.nextShakeTime = this.getNextShakeTime();
        }
        // shaking
        if ((now - this.shakeStartTime) < VOLTORB_SHAKE_DURATION) {
            this.shake();
        } else {
            // shake end
            this.sprite.x = this.x;
            this.sprite.y = this.y;
        }
    }

    shake() {
        this.sprite.x = frameCount % 4 > 2 ? this.x : this.shakeX;
        this.sprite.y = frameCount % 4 > 2 ? this.y : this.y + 2;
    }

    bounceBall(ball) {
        if (Math.abs(ball.velocity.x) < VOLTORB_MIN_VELOCITY_BOUNCE_THRESHOLD) {
            ball.velocity.y *= VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_STRONG;
            ball.velocity.x *= VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_STRONG;
        } else {
            ball.velocity.y *= VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_WEAK;
            ball.velocity.x *= VOLTORB_BOUNCE_VELOCITY_MULTIPLIER_WEAK;
        }
    }
}