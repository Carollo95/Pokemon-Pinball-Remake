class CaveDetector {

    constructor(x, y, frame) {
        this.active = false;
        this.frame = frame;

        this.sprite = new Sprite(x, y, 14, 14, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('detector', Asset.getAnimation('caveDetector'));
        this.sprite.ani.playing = false;

        this.sensor = new Sprite(x, y + 8, 6, 12, 'none');
        this.sensor.debug = DEBUG;
        this.sensor.layer = SCENARIO_LAYER;
        this.sensor.visible = false;
    }

    update(ballSprite) {
        if (this.sensor.overlap(ballSprite)) {
            this.setActive(true);
        }
    }

    setCompanionDetector(companionDetector) {
        this.companionDetector = companionDetector;
    }

    setActive(active) {
        this.active = active;
        if (this.active) {
            this.sprite.ani.frame = this.frame;
            if (this.companionDetector.active) {
                EngineUtils.addPointsForBallHelper(POINTS.OUT_LANE_RETURN_LANE_LIGHT_UP);
            } else {
                EngineUtils.addPointsForBallHelper(POINTS.OUT_LANE_RETURN_LANE_MATCH_UP);
            }
        } else {
            this.sprite.ani.frame = 0;
        }
    }

}