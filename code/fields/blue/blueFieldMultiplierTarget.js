class BlueFieldMultiplierTarget extends MultiplierTarget {
    constructor(collider, buttonSprite, displayX, displayY, callback) {
        super(collider, buttonSprite, displayX, displayY, callback);
    }



    getActiveMultiplierAnimation() {
        return Asset.getAnimation('blueFieldMultiplierActive');
    }

    getInactiveMultiplierAnimation() {
        return Asset.getAnimation('blueFieldMultiplier');
    }


    static createLeftMultiplierTarget(callback) {
        const collider = new Sprite(87, 302, 15, 15, "none");
        const buttonSprite = this.createButtonSprite(85, 298);
        return new BlueFieldMultiplierTarget(collider, buttonSprite, 75, 277, callback);
    }

    static createRightMultiplierTarget(callback) {
        const collider = new Sprite(231, 302, 15, 15, "none");
        const buttonSprite = this.createButtonSprite(234, 298);
        buttonSprite.mirror.x = true;
        return new BlueFieldMultiplierTarget(collider, buttonSprite, 245, 277, callback);
    }

    static createButtonSprite(x, y) {
        const buttonSprite = new Sprite(x, y, 28, 20, "none");
        buttonSprite.debug = DEBUG;
        buttonSprite.layer = SCENARIO_LAYER;
        buttonSprite.addAnimation('button', Asset.getAnimation('blueFieldMultiplierButton'));
        buttonSprite.ani.playing = false;
        return buttonSprite;
    }

}