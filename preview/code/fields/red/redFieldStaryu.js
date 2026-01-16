const RED_FIELD_STATYU_COOLDOWN = 1000;
const SENSOR_SPRITE_TIMER_DURATION = 200;

class RedFieldStaryu {

    constructor() {

        this.sensorSprite = new Sprite(113, 244, 42, 32, "none");
        this.sensorSprite.debug = DEBUG;
        this.sensorSprite.layer = SCENARIO_LAYER;
        this.sensorSprite.addAnimation("staryuButton", Asset.getAnimation('redFieldStaryuButton'));
        this.sensorSprite.ani.playing = false;

        this.sensor = new Sprite(120, 246, 20, 20, "none");
        this.sensor.debug = DEBUG;
        this.sensor.layer = SCENARIO_LAYER;
        this.sensor.visible = false;


        this.sensorSpriteTimer = new EventTimer(SENSOR_SPRITE_TIMER_DURATION);
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
            [130, 98],
            [130, 128],
            [118, 136],
            [100, 153],
            [100, 132]

        ], "static");
        leftBlocker.debug = DEBUG;
        leftBlocker.layer = OVER_SCENARIO_LAYER;
        leftBlocker.addAnimation("blocked", Asset.getAnimation('redFieldUpgradeBlockerLeft'));

        return leftBlocker
    }

    createCenterBlocker() {
        let centerBlocker = new Sprite([
            [144, 94],
            [160, 90],
            [183, 86],
            [175, 115],
            [160, 120],
            [144, 126],
            [144, 94]

        ], "static");
        centerBlocker.debug = DEBUG;
        centerBlocker.layer = OVER_SCENARIO_LAYER;
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
        rightBlocker.layer = OVER_SCENARIO_LAYER;
        rightBlocker.addAnimation("blocked", Asset.getAnimation('redFieldUpgradeBlockerRight'));

        return rightBlocker;
    }


    update(ballSprite) {
        if (ballSprite.overlaps(this.sensor) && this.hasPassedCooldown()) {
            this.sensorSprite.ani.frame = 1;
            this.sensorSpriteTimer.restart();
            this.invert();
        }

        if (this.sensorSprite.ani.frame === 1 && this.sensorSpriteTimer.hasElapsed()) {
            this.sensorSprite.ani.frame = 0;
        }
    }

    hasPassedCooldown() {
        return (millis() - this.lastChange) > RED_FIELD_STATYU_COOLDOWN;
    }

    invert() {
        this.lastChange = millis();
        this.active = !this.active;
        EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_STARYU_SWITCH);
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