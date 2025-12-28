class ScreenSlot {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation("slotsBW", Asset.getAnimation('slotsBW'));

    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update(ballSprite) {
    }

}