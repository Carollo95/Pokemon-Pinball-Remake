const BUMPER_MIN_VELOCITY_BOUNCE_THRESHOLD = 0.4;
const BUMPER_BOUNCE_VELOCITY_MULTIPLIER_STRONG = -1.8;
const BUMPER_BOUNCE_VELOCITY_MULTIPLIER_WEAK = -1.3;
const BUMPER_COOLDOWN_TIME = 1100;

class Bumper {

    constructor(x, y, onHitCallback) {
        this.x = x;
        this.y = y;
        this.onHitCallback = onHitCallback;
        this.sprite = new Sprite(x, y, 26, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;
        
        this.lastHitTimer = new EventTimer(BUMPER_COOLDOWN_TIME);

        this.sprite.addAni('hurt', this.getHurtAnimation());
        this.sprite.addAni('idle', this.getIdleAnimation());
    }

    update(ball) {
        if (this.sprite.collide(ball) && this.lastHitTimer.hasElapsed()) {

            this.bounceBall(ball);
            this.onHitCallback();
            this.sprite.changeAnimation("hurt");
            Audio.playSFX(this.getHitSFX());

            this.lastHitTimer.restart();
            this.nextShakeTime = millis();

            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;
            this.sprite.ani.onComplete = () => {
                this.sprite.changeAnimation('idle');
                this.onFinishedHurtAnimation();
            };
        }
    }

    onFinishedHurtAnimation() {}


    bounceBall(ball) {
        if (Math.abs(ball.velocity.x) < BUMPER_MIN_VELOCITY_BOUNCE_THRESHOLD) {
            ball.velocity.y *= BUMPER_BOUNCE_VELOCITY_MULTIPLIER_STRONG;
            ball.velocity.x *= BUMPER_BOUNCE_VELOCITY_MULTIPLIER_STRONG;
        } else {
            ball.velocity.y *= BUMPER_BOUNCE_VELOCITY_MULTIPLIER_WEAK;
            ball.velocity.x *= BUMPER_BOUNCE_VELOCITY_MULTIPLIER_WEAK;
        }
    }
}