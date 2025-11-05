const RED_FIELD_STATYU_COOLDOWN = 1000;

class RedFieldStaryu {

    constructor() {
        this.sprite = new Sprite(110, 230, 48, 48, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation("inactive", Asset.getAnimation('redFieldStaryuInactive'));
        this.sprite.addAnimation("active", Asset.getAnimation('redFieldStaryuActive'));

        this.miniSprite = new Sprite(16, 314, 32, 32, "none");
        this.miniSprite.debug = DEBUG;
        this.miniSprite.layer = SCENARIO_LAYER;
        this.miniSprite.addAnimation("inactive", Asset.getAnimation('redFieldSmallStaryuInactive'));
        this.miniSprite.addAnimation("active", Asset.getAnimation('redFieldSmallStaryuActive'));

        this.sensor = new Sprite(120, 246, 20, 20, "none");
        this.sensor.debug = DEBUG;
        this.sensor.layer = SCENARIO_LAYER;
        this.sensor.visible = false;

        this.active = false;

        this.leftBlocker = this.createLeftBlocker();
        this.centerBlocker = this.createCenterBlocker();
        this.rightBlocker = this.createRightBlocker();

        this.lastChange = 0;

    }

    createLeftBlocker() {
        let leftBlocker = new Sprite([
            [100, 132],
            [113, 114],
            [131, 98],
            [131, 128],
            [118, 136],
            [100, 153],
            [100, 132]

        ], "static");
        leftBlocker.debug = DEBUG;
        leftBlocker.layer = SCENARIO_LAYER;
        leftBlocker.addAnimation("blocked", Asset.getAnimation('redFieldUpgradeBlockerLeft'));

        return leftBlocker
    }

    createCenterBlocker() {
        let centerBlocker = new Sprite([
            [144, 94],
            [160, 89],
            [175, 88],
            [175, 115],
            [160, 120],
            [144, 126],
            [144, 94]

        ], "static");
        centerBlocker.debug = DEBUG;
        centerBlocker.layer = SCENARIO_LAYER;
        centerBlocker.addAnimation("blocked", Asset.getAnimation('redFieldUpgradeBlockerCenter'));

        return centerBlocker;
    }

    createRightBlocker() {
        let rightBlocker = new Sprite([
            [188, 89],
            [205, 92],
            [219, 99],
            [219, 153],
            [214, 131],
            [204, 123],
            [192, 117],
            [188, 115],
            [188, 89]
        ], "static");
        rightBlocker.debug = DEBUG;
        rightBlocker.layer = SCENARIO_LAYER;
        rightBlocker.addAnimation("blocked", Asset.getAnimation('redFieldUpgradeBlockerRight'));

        return rightBlocker;
    }


    update(ballSprite) {
        if (ballSprite.overlaps(this.sensor) && this.hasPassedCooldown()) {
            this.invert();
        }
    }

    hasPassedCooldown() {
        return (millis() - this.lastChange) > RED_FIELD_STATYU_COOLDOWN;
    }

    invert() {
        this.lastChange = millis();
        this.active = !this.active;
        Audio.playSFX('sfx07');
        if (this.active) {
            this.sprite.changeAnimation('active');
            this.miniSprite.changeAnimation('active');
            this.leftBlocker.remove();
            this.centerBlocker.remove();
            this.rightBlocker.remove();
        } else {
            this.sprite.changeAnimation('inactive');
            this.miniSprite.changeAnimation('inactive');
            this.leftBlocker = this.createLeftBlocker();
            this.centerBlocker = this.createCenterBlocker();
            this.rightBlocker = this.createRightBlocker();
        }
    }

}