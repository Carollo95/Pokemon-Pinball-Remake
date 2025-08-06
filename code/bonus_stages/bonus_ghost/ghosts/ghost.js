const GHOST_RESPAWN_THRESHOLD_MILLS = 3000; //Time between instance creation and spawn
const GHOST_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking
const GHOST_TIME_OF_HURT = 1000; //Frames showing the blinking hurt animation

class Ghost {
    sprite;
    start_x;
    start_y;
    disabled;

    hurtAnimation;
    timeOfHurt;


    constructor(x, y, width, height) {
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
        return (millis() - this.timeOfDissapearance) > GHOST_RESPAWN_THRESHOLD_MILLS;
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > GHOST_TIME_OF_HURT
    }

}