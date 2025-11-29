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
        this.active = true;
    }

    setVisible(visible) {
        console.log("setVisible " + visible);
        this.visible = visible;

        //In case of disabling, hide it immediately, if enabling let update handle the visibility (for blinking)
        if(!visible) {
            this.sprite.visible = false;
        }
    }

    setActive(active) {
        console.log("setActive " + active);
        this.active = active;
        this.setVisible(active);

    }

    update() {
        if (this.visible && this.active) {
            EngineUtils.blinkSprite(this.sprite, 16);
        }
    }

}