const BALL_UPGRADER_ANIMATION_DURATION = 1000;

class BallUpgraderElement {

    constructor(x, y) {
        this.active = false;

        this.sprite = new Sprite(x, y, 12, 24, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('upgraderElement', Asset.getAnimation('ballUpgraderElement'));
        this.sprite.ani.playing = false;

        this.sensor = new Sprite(x, y + 8, 6, 12, 'none');
        this.sensor.debug = DEBUG;
        this.sensor.layer = SCENARIO_LAYER;
        this.sensor.visible = false;

        this.animateTimeStart = -BALL_UPGRADER_ANIMATION_DURATION;
        this.animating = false;
    }

    update(ballSprite) {
        if (this.animating) {
            this.sprite.ani.playing = true;
            if (millis() - this.animateTimeStart > BALL_UPGRADER_ANIMATION_DURATION) {
                this.animating = false;
                this.sprite.ani.playing = false;
                this.setActive(this.active);
            }
        } else if (ballSprite.overlaps(this.sensor)) {
            this.setActive(!this.active);
        }
    }


    setActive(active) {
        this.active = active;
        if (this.active) {
            this.sprite.ani.frame = 1;
        } else {
            this.sprite.ani.frame = 0;
        }
    }

    animate() {
        this.animateTimeStart = millis();
        this.animating = true;
    }

}