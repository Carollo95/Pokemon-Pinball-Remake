const RED_FIELD_ARROWS_BLINK_RATE = 40;
const RED_FIELD_ARROWS_BLINK_HALF_RATE = 20;

const RED_FIELD_ARROW_STATE = {
    NORMAL: "normal",
    TRAVEL_LEFT: "travel_left",
    TRAVEL_RIGHT: "travel_right"
}

class RedFieldArrows {
    constructor() {
        this.captureArrows = new Sprite(245, 324, 46, 68, "none");
        this.captureArrows.debug = DEBUG;
        this.captureArrows.layer = SCENARIO_LAYER;
        this.captureArrows.addAni("captureAnimation", Asset.getAnimation("redFieldCaptureArrows"));
        this.captureArrows.ani.playing = false;
        this.setCaptureArrowsLevel(2);

        this.bellsproutArrow = new Sprite(207, 284, 34, 32, "none");
        this.bellsproutArrow.debug = DEBUG;
        this.bellsproutArrow.layer = SCENARIO_LAYER;
        this.bellsproutArrow.addAni("bellsproutArrow", Asset.getAnimation("redFieldBellsproutArrow"));
        this.bellsproutArrow.ani.playing = false;


        this.caveArrow = new Sprite(161, 315, 26, 22, "none");
        this.caveArrow.debug = DEBUG;
        this.caveArrow.layer = SCENARIO_LAYER;
        this.caveArrow.addAni("caveArrow", Asset.getAnimation("redFieldCaveArrow"));
        this.caveArrow.ani.playing = false;
        this.caveActive = false;

        this.leftInnerArrow = new Sprite(113, 284, 34, 32, "none");
        this.leftInnerArrow.debug = DEBUG;
        this.leftInnerArrow.layer = SCENARIO_LAYER;
        this.leftInnerArrow.addAni("leftInnerArrow", Asset.getAnimation("redFieldLeftInnerArrow"));
        this.leftInnerArrow.ani.playing = false;

        this.evolutionArrows = new Sprite(75, 324, 46, 68, "none");
        this.evolutionArrows.debug = DEBUG;
        this.evolutionArrows.layer = SCENARIO_LAYER;
        this.evolutionArrows.addAni("evolutionArrows", Asset.getAnimation("redFieldEvolutionArrows"));
        this.evolutionArrows.ani.playing = false;

        this.state = RED_FIELD_ARROW_STATE.NORMAL;
    }

    update(visible) {
        if (this.state === RED_FIELD_ARROW_STATE.NORMAL) {
            this.blinkCaptureArrows(visible);
            this.blinkBellsproutArrow(visible);
            this.blinkCaveArrow(visible);
        } else if (this.state === RED_FIELD_ARROW_STATE.TRAVEL_LEFT) {
            this.blinkTravelLeftArrows(visible);
        } else if (this.state === RED_FIELD_ARROW_STATE.TRAVEL_RIGHT) {
            this.blinkTravelRightArrows(visible);
        }
    }

    blinkCaptureArrows(visible) {
        if (visible) {
            if (this.captureArrowsLevel < 3) {
                frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                    this.captureArrows.ani.frame = this.captureArrowsLevel :
                    this.captureArrows.ani.frame = this.captureArrowsLevel + 1;
            }
        } else {
            this.captureArrows.ani.frame = 0;
        }
    }

    blinkBellsproutArrow(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.bellsproutArrow.ani.frame = 0 :
                this.bellsproutArrow.ani.frame = (this.captureArrowsLevel >= 2 ? 1 : 0);
        } else {
            this.bellsproutArrow.ani.frame = 0;
        }
    }

    blinkCaveArrow(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.caveArrow.ani.frame = 0 :
                this.caveArrow.ani.frame = this.caveActive ? 1 : 0;
        } else {
            this.caveArrow.ani.frame = 0;
        }
    }

    resetCaptureArrows() {
        this.setCaptureArrowsLevel(0);
    }

    setCaptureArrowsLevel(level) {
        this.captureArrowsLevel = level;
        this.captureArrows.ani.frame = this.captureArrowsLevel;
    }

    upgradeCaptureArrows() {
        if (this.captureArrowsLevel < 3) {
            this.captureArrowsLevel++;
            this.captureArrows.ani.frame = this.captureArrowsLevel;
        }
    }

    turnOnCaveArrow() {
        this.caveActive = true;
    }

    turnOffCaveArrow() {
        this.caveActive = false;
    }

    blinkTravelLeftArrows(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.leftInnerArrow.ani.frame = 0 :
                this.leftInnerArrow.ani.frame = 1;
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.evolutionArrows.ani.frame = 0 :
                this.evolutionArrows.ani.frame = 1;
        } else {
            this.leftInnerArrow.ani.frame = 0;
            this.evolutionArrows.ani.frame = 0;
        }
    }

    blinkTravelRightArrows(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.bellsproutArrow.ani.frame = 0 :
                this.bellsproutArrow.ani.frame = 1;
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.captureArrows.ani.frame = 0 :
                this.captureArrows.ani.frame = 1;
        } else {
            this.bellsproutArrow.ani.frame = 0;
            this.captureArrows.ani.frame = 0;
        }
    }

    getState() {
        return {
            captureArrowsLevel: this.captureArrowsLevel
        };
    }

    setState(state) {
        this.setCaptureArrowsLevel(state.captureArrowsLevel);
    }


    setTravel(direction) {
        if (direction === TRAVEL_DIRECTION.LEFT) {
            this.state = RED_FIELD_ARROW_STATE.TRAVEL_LEFT;
        } else if (direction === TRAVEL_DIRECTION.RIGHT) {
            this.state = RED_FIELD_ARROW_STATE.TRAVEL_RIGHT;
        }
    }

    resetFromTravel() {
        this.state = RED_FIELD_ARROW_STATE.NORMAL;
    }

}