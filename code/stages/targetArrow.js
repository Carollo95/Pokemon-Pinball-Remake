class TargetArrow {

    constructor(x, y, arrow) {
        this.sprite = new Sprite(x, y, 16, 16, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAni('arrow', Asset.getAnimation('redFieldTargetArrows'));
        this.sprite.changeAni('arrow');
        this.sprite.ani.frame = arrow;
        this.sprite.ani.playing = false;
        this.sprite.visible = false;
        this.visible = this.sprite.visible;
    }

    setVisible(visible) {
        this.visible = visible;
        this.sprite.visible = visible;
    }

    update() {
        if (this.visible) {
            EngineUtils.blinkSprite(this.sprite, 16);
        }
    }

}