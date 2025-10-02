class Sensor {
    constructor(x, y, callback) {
        this.sprite = new Sprite(x, y, 4, 4, "none");
        this.sprite.visible = false;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.debug = DEBUG;
        this.callback = callback;
    }


    update(ballSprite) {
        if (this.sprite.overlaps(ballSprite)) {
            this.callback();
        }
    }

}