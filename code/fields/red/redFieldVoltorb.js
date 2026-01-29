const VOLTORB_SHAKE_TIME = 1000;
const VOLTORB_SHAKE_DURATION = 200;

const STATE = {
    STILL: 0,
    SHAKE: 1
}

class RedFieldVoltorb extends Bumper {

    constructor(x, y, onHitCallback) {
        super(x, y, onHitCallback);
        this.shakeX = this.x + 4;
        this.nextShakeTime = this.getNextShakeTime();
        this.state = STATE.STILL;
    }

    getHitSFX() {
        return 'sfx0E';
    }

    getIdleAnimation() {
        return Asset.getAnimation('redFieldVoltorbIdle')
    }

    getHurtAnimation() {
        return Asset.getAnimation('redFieldVoltorbHurt')
    }

    onFinishedHurtAnimation() {
        this.nextShakeTime = this.getNextShakeTime();
    }

    update(ball) {
        super.update(ball);
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

}