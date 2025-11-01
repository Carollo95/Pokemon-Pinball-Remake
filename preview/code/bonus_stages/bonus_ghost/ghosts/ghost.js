const GHOST_BLINKING_FRAMES = 6; // frames between visible/invisible while blinking
const GHOST_TIME_OF_HURT_MS = 1000; // milliseconds showing hurt blink

class Ghost {
    constructor(x, y, width, height, onHitCallback) {
        // animations (subclasses set actual animation assets)
        this.hurtAnimation = null;
        this.idleAnimation = null;

        // timing/state
        this.timeOfHurt = 0;
        this.timeOfDisappearance = 0;
        this.respawnThresholdTime = 0; // subclasses set

        // initial position
        this.start_x = x;
        this.start_y = y;

        // collision sprite
        this.sprite = new Sprite(x, y, width, height, "static");
        this.sprite.layer = SPRITE_LAYER;
        this.sprite.debug = DEBUG;
        this.disabled = false;

        this.onHitCallback = onHitCallback;
    }

    blink() {
        EngineUtils.blinkSprite(this.sprite, GHOST_BLINKING_FRAMES);
    }

    stopBlink() {
        this.sprite.visible = true;
    }

    readyToRespawn() {
        return this.disabled && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfDisappearance) > this.respawnThresholdTime;
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > GHOST_TIME_OF_HURT_MS;
    }

    // convenience: disable this ghost's sprite and mark timestamps
    disableSprite() {
        EngineUtils.disableSprite(this.sprite);
        this.disabled = true;
        this.sprite.visible = false;
        this.timeOfDisappearance = millis();
    }

    enableSprite() {
        EngineUtils.enableSprite(this.sprite);
        this.disabled = false;
        this.sprite.visible = true;
    }
}