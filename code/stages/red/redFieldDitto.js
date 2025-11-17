const RED_STAGE_DITTO_STATE = {
    OPEN: 0,
    CLOSE: 1,
    FULLY_OPEN: 2
};

class RedFieldDitto {
    constructor() {
        this.createOpenSprite();
        this.status = RED_STAGE_DITTO_STATE.OPEN;
        this.well = new Well(36,38,10,20,40);
    }

    update(ball){
        this.well.applyGravity(ball.sprite);
    }


    removeSprites() {
        this.openSprite && this.openSprite.remove();
        this.closeSprite && this.closeSprite.remove();
        this.fullyOpenSprite && this.fullyOpenSprite.remove();
        this.removeOuterLoopDoor();
    }

    open() {
        this.removeSprites();
        Audio.playSFX('sfx00');
        this.createOpenSprite();
        this.status = RED_STAGE_DITTO_STATE.OPEN;
        this.removeOuterLoopDoor();
    }

    createOpenSprite() {
        this.openSprite = new Sprite([
            [18, 142],
            [24, 116],
            [30, 100],
            [38, 84],
            [44, 76],
            [56, 63],
            [64, 58],
            [4, 34],
            [4, 144],
            [18, 142]
        ], 'static');

        this.openSprite.addAnimation(Asset.getAnimation('redFieldDittoOpen'));
        this.openSprite.debug = DEBUG;
        this.openSprite.layer = SPRITE_LAYER;
    }

    isOpen() {
        return this.status === RED_STAGE_DITTO_STATE.OPEN;
    }

    close(silent = false) {
        this.removeSprites();

        if (!silent) Audio.playSFX('sfx00');

        this.closeSprite = new Sprite([
            [20, 188],
            [26, 156],
            [34, 138],
            [46, 120],
            [54, 108],
            [70, 92],
            [80, 84],
            [90, 70],
            [20, 44],
            [18, 160],
            [18, 190],
            [20, 188],
        ], 'static');
        this.closeSprite.addAnimation(Asset.getAnimation('redFieldDittoClosed'));
        this.closeSprite.debug = DEBUG;
        this.closeSprite.layer = SPRITE_LAYER;

        this.status = RED_STAGE_DITTO_STATE.CLOSE;
        this.createOuterLoopDoor();
    }

    isClosed() {
        return this.status === RED_STAGE_DITTO_STATE.CLOSE;
    }

    fullyOpen() {
        this.removeSprites();
        Audio.playSFX('sfx00');

        this.fullyOpenSprite = new Sprite(8, 106, 16, 44, 'static');
        this.fullyOpenSprite.addAnimation(Asset.getAnimation('redFieldDittoFullyOpen'));
        this.fullyOpenSprite.debug = DEBUG;
        this.fullyOpenSprite.layer = SPRITE_LAYER;

        this.status = RED_STAGE_DITTO_STATE.FULLY_OPEN;
        this.removeOuterLoopDoor();
    }

    isFullyOpen() {
        return this.status === RED_STAGE_DITTO_STATE.FULLY_OPEN;
    }

    createOuterLoopDoor() {
        this.outerLoopDoor = new Sprite([
            [198, 50],
            [220, 54],
            [242, 62],
            [268, 78],
            [278, 88],
            [288, 108],
            [290, 118],
            [296, 132],
            [300, 158],
            [290, 134],
            [272, 108],
            [256, 92],
            [240, 80],
            [234, 76],
            [198, 50]
        ], "static");
        this.outerLoopDoor.layer = SCENARIO_LAYER;
        this.outerLoopDoor.debug = DEBUG;
        this.outerLoopDoor.visible = true;

        this.outerLoopImage = new Sprite(244, 98, 104, 104, "none");
        this.outerLoopImage.addAnimation(Asset.getAnimation('redFieldOuterLoopDoor'));
        this.outerLoopImage.layer = SCENARIO_LAYER;
        this.outerLoopImage.debug = DEBUG;
        this.outerLoopImage.visible = true;
    }

    createLauncherDoor() {
        if (this.launcherDoor) return;

        this.launcherDoor = new Sprite([
            [180, 21],
            [226, 37],
            [250, 54],
            [276, 80],
            [276, 21],
            [180, 21]
        ], "static");
        this.launcherDoor.layer = SCENARIO_LAYER;
        this.launcherDoor.debug = DEBUG;
        this.launcherDoor.visible = true;
    }

    removeLauncherDoor() {
        this.launcherDoor && this.launcherDoor.remove();
        this.launcherDoor = undefined;
    }

    removeOuterLoopDoor() {
        this.outerLoopDoor && this.outerLoopDoor.remove();
        this.outerLoopImage && this.outerLoopImage.remove();
    }


}