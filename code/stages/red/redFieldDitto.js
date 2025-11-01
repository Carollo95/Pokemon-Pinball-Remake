const RED_STAGE_DITTO_STATE = {
    OPEN: 0,
    CLOSE: 1,
    FULLY_OPEN: 2
};

class RedFieldDitto {
    constructor() {
        this.createOpenSprite();
        this.status = RED_STAGE_DITTO_STATE.OPEN;
    }

    removeSprites() {
        this.openSprite && this.openSprite.remove();
        this.closeSprite && this.closeSprite.remove();
        this.fullyOpenSprite && this.fullyOpenSprite.remove();
    }

    open() {
        this.removeSprites();
        Audio.playSFX('sfx00');
        this.createOpenSprite();
        this.status = RED_STAGE_DITTO_STATE.OPEN;
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

    close() {
        this.removeSprites();
        Audio.playSFX('sfx00');

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
    }

    isFullyOpen() {
        return this.status === RED_STAGE_DITTO_STATE.FULLY_OPEN;
    }



}