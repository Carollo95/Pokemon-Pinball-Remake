const RED_FIELD_STATYU_COOLDOWN = 1000;

class RedFieldStaryu {

    constructor() {
        this.sprite = new Sprite(110, 230, 48, 48, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation("inactive", Asset.getAnimation('redFieldStaryuInactive'));
        this.sprite.addAnimation("active", Asset.getAnimation('redFieldStaryuActive'));

        this.miniSprite = new Sprite(16, 314, 32, 32, "static");
        this.miniSprite.debug = DEBUG;
        this.miniSprite.layer = SCENARIO_LAYER;
        this.miniSprite.addAnimation("inactive", Asset.getAnimation('redFieldSmallStaryuInactive'));
        this.miniSprite.addAnimation("active", Asset.getAnimation('redFieldSmallStaryuActive'));

        this.sensor = new Sprite(120, 246, 20, 20, "none");
        this.sensor.debug = DEBUG;
        this.sensor.layer = SCENARIO_LAYER;
        this.sensor.visible = false;
        
        this.status = true;

        this.lastChange = 0;
    }


    update(ballSprite) {
        if(ballSprite.overlaps(this.sensor)&& this.hasPassedCooldown()) {
            this.invert();
        }
    }

    hasPassedCooldown() {
        return (millis() - this.lastChange) > RED_FIELD_STATYU_COOLDOWN;
    }

    invert() {
        this.lastChange = millis();
        this.status = !this.status;
        if (this.status) {
            this.sprite.changeAnimation('active');
            this.miniSprite.changeAnimation('active');
        } else {
            this.sprite.changeAnimation('inactive');
            this.miniSprite.changeAnimation('inactive');
        }
    }

}