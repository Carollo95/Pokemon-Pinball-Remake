class StageWell {
    constructor() {
        this.sprite = new Sprite(161, 282, 64, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('openWell', Asset.getAnimation('openWell'));
        this.sprite.addAnimation('closedWell', Asset.getAnimation('closedWell'));


        this.auraSprite = new Sprite(161, 284, 66, 62, "none");
        this.auraSprite.debug = DEBUG;
        this.auraSprite.layer = SCENARIO_LAYER;
        this.auraSprite.addAnimation('wellAura', Asset.getAnimation('wellAura'));
        this.auraSprite.animation.visible = false;
    }

    open(callback) {
        this.sprite.changeAnimation('openWell');
        this.auraSprite.animation.visible = true;
    }

    close() {
        this.sprite.changeAnimation('closedWell');
        this.auraSprite.animation.visible = false;
    }

}