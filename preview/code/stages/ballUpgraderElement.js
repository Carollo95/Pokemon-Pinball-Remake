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
    }

    update(ballSprite) {
        if(ballSprite.overlaps(this.sensor)) {
            this.setActive(!this.active);
        }
    }


    setActive(active) {
        this.active = active;
        if(this.active) {
            this.sprite.ani.frame = 1;
        } else {
            this.sprite.ani.frame = 0;
        }
    }

}