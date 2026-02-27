const BLUE_ARROW_DIRECTION = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}

const UPDATE_EVENT_TIMER = 1000;
const BLUE_ARROW_PUSH_FORCE = 120;
const BLUE_ARROW_HORIZONTAL_DAMPING_FORCE = 20;

class BlueArrow {

    constructor(callback) {
        this.callback = callback;

        this.sprite = new Sprite(160, 209, 1, 1, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('blueArrow', Asset.getAnimation('blueFieldBlueArrow'));
        this.sprite.ani.playing = false;

        this.updateTimer = new EventTimer(UPDATE_EVENT_TIMER);

        this.eastGateExclusionZone = new Sprite(220, 206, 85, 30, "none");
        this.eastGateExclusionZone.debug = DEBUG;
        this.eastGateExclusionZone.layer = SCENARIO_LAYER;
        this.eastGateExclusionZone.visible = false;
        this.westGateExclusionZone = new Sprite(100, 206, 85, 30, "none");
        this.westGateExclusionZone.debug = DEBUG;
        this.westGateExclusionZone.layer = SCENARIO_LAYER;
        this.westGateExclusionZone.visible = false;

    }

    update(ballSprite, captureGateOpen, evolutionGateOpen, fieldState) {
        if (this.updateTimer.hasElapsed()) {
            this.updateTimer.restart();
            const direction = this.getRandomDirection(this.getValidDirections(captureGateOpen, evolutionGateOpen, ballSprite, fieldState));
            this.changeDirection(direction, ballSprite);
        }

        if (ballSprite.overlaps(this.sprite)) {
            switch (this.direction) {
                case BLUE_ARROW_DIRECTION.NORTH:
                    ballSprite.applyForce(0, -BLUE_ARROW_PUSH_FORCE);
                    break;
                case BLUE_ARROW_DIRECTION.WEST:
                    ballSprite.vel.y = 0;
                    ballSprite.applyForce(-BLUE_ARROW_PUSH_FORCE, 0);
                    break;
                case BLUE_ARROW_DIRECTION.EAST:
                    ballSprite.vel.y = 0;
                    ballSprite.applyForce(BLUE_ARROW_PUSH_FORCE, 0);
                    break;
            }
        }
    }

    restartTimer() {
        this.updateTimer.restart();
    }

    getValidDirections(captureGateOpen, evolutionGateOpen, ballSprite, fieldState) {
        let validDirections = [];

        if ((captureGateOpen && fieldState === FIELD_STATE.PLAYING) || fieldState === FIELD_STATE.TRAVEL_RIGHT) {
            validDirections.push(BLUE_ARROW_DIRECTION.EAST);
        }

        if ((evolutionGateOpen && fieldState === FIELD_STATE.PLAYING) || fieldState === FIELD_STATE.TRAVEL_LEFT) {
            validDirections.push(BLUE_ARROW_DIRECTION.WEST);
        }

        if (ballSprite.y < this.sprite.y) {
            validDirections.push(BLUE_ARROW_DIRECTION.SOUTH);
        } else {
            validDirections.push(BLUE_ARROW_DIRECTION.NORTH);
        }

        return validDirections;
    }

    getRandomDirection(directions) {
        return directions[Math.floor(Math.random() * directions.length)];
    }

    changeDirection(newDirection, ballSprite) {
        this.direction = newDirection;
        this.callback(newDirection);

        switch (newDirection) {
            case BLUE_ARROW_DIRECTION.NORTH:
                this.createEastGate(ballSprite);
                this.createWestGate(ballSprite);
                this.sprite.ani.frame = 0;
                break;
            case BLUE_ARROW_DIRECTION.EAST:
                this.removeEastGate();
                this.createWestGate(ballSprite);
                this.sprite.ani.frame = 1;
                break;
            case BLUE_ARROW_DIRECTION.SOUTH:
                this.createEastGate(ballSprite);
                this.createWestGate(ballSprite);
                this.sprite.ani.frame = 2;
                break;
            case BLUE_ARROW_DIRECTION.WEST:
                this.createEastGate(ballSprite);
                this.removeWestGate();
                this.sprite.ani.frame = 3;
                break;
        }
    }

    createEastGate(ballSprite) {
        if (!this.eastGate && !this.eastGateExclusionZone.overlapping(ballSprite)) {
            this.eastGate = new Sprite(190, 210, 20, 30, "static");
            this.eastGate.debug = DEBUG;
            this.eastGate.layer = SCENARIO_LAYER;
            this.eastGate.visible = false;
        }
    }

    removeEastGate() {
        if (this.eastGate != null) {
            this.eastGate.remove();
            this.eastGate = null;
        }
    }

    createWestGate(ballSprite) {
        if (!this.westGate && !this.westGateExclusionZone.overlapping(ballSprite)) {
            this.westGate = new Sprite(130, 210, 20, 30, "static");
            this.westGate.debug = DEBUG;
            this.westGate.layer = SCENARIO_LAYER;
            this.westGate.visible = false;
        }
    }

    removeWestGate() {
        if (this.westGate != null) {
            this.westGate.remove();
            this.westGate = null;
        }
    }

}