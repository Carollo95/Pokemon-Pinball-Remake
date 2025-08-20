const GHOST_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking
const GHOST_TIME_OF_HURT = 1000; //Frames showing the blinking hurt animation

class Ghost {
    constructor(x, y, width, height) {
        this.hurtAnimation;
        this.timeOfHurt;
        this.respawnThreshHoldTime;

        this.start_x = x;
        this.start_y = y;

        this.timeOfHurt = 0;

        this.sprite = new Sprite(x, y, width, height, "static");
        this.sprite.debug = DEBUG;
        this.disabled = false;
    }

    blink() {
        this.sprite.visible = (frameCount % (GHOST_BLINKING_FRAMES * 2) < GHOST_BLINKING_FRAMES);
    }

    stopBlink() {
        this.sprite.visible = true;
    }

    readyToRespawn() {
        return this.disabled && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfDissapearance) > this.respawnThreshHoldTime;
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > GHOST_TIME_OF_HURT
    }

}