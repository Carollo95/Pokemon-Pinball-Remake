const MULTIPLIER_TARGET_COOLDOWN_TIME = 1000; // in milliseconds

class MultiplierTarget {


    constructor(colliderX, colliderY, displayX, displayY, callback) {
        this.sprite = new Sprite(displayX, displayY, 14, 14, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('active', Asset.getAnimation('redFieldMultiplierActive'));
        this.sprite.addAnimation('inactive', Asset.getAnimation('redFieldMultiplier'));
        this.sprite.ani.playing = false;

        this.target = new Sprite(colliderX, colliderY, 6, 9, "none");
        this.target.debug = DEBUG;
        this.target.layer = SCENARIO_LAYER;
        this.target.visible = false;

        this.callback = callback;
        this.lastHitTime = -10000;
    }


    update(ballSprite) {
        if (this.target.overlaps(ballSprite) && this.hasCooldownTimePassed()) {
            this.callback();
            this.lastHitTime = millis();
        }

    }

    hasCooldownTimePassed() {
        return millis() - this.lastHitTime >= MULTIPLIER_TARGET_COOLDOWN_TIME;
    }


}