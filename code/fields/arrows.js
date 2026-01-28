const RED_FIELD_ARROWS_BLINK_RATE = 40;
const RED_FIELD_ARROWS_BLINK_HALF_RATE = 20;

const RED_FIELD_ARROW_STATE = {
    NORMAL: "normal",
    TRAVEL_LEFT: "travel_left",
    TRAVEL_RIGHT: "travel_right",
    TRAVEL_CAVE: "travel_cave"
}

class Arrows {
    constructor() {
        this.captureArrows = new Sprite(245, 324, 46, 68, "none");
        this.captureArrows.debug = DEBUG;
        this.captureArrows.layer = SCENARIO_LAYER;
        this.captureArrows.addAni("captureAnimation", this.getCaptureArrowAnimation());
        this.captureArrows.ani.playing = false;

        this.rightInnerArrow = new Sprite(207, 284, 34, 32, "none");
        this.rightInnerArrow.debug = DEBUG;
        this.rightInnerArrow.layer = SCENARIO_LAYER;
        this.rightInnerArrow.addAni("rightInnerArrow", this.getRightInnerArrowAnimation());
        this.rightInnerArrow.ani.playing = false;

        this.caveArrow = new Sprite(161, 315, 26, 22, "none");
        this.caveArrow.debug = DEBUG;
        this.caveArrow.layer = SCENARIO_LAYER;
        this.caveArrow.addAni("caveArrow", this.getCaveArrowAnimation());
        this.caveArrow.ani.playing = false;
        this.caveActive = false;

        this.leftInnerArrow = new Sprite(113, 284, 34, 32, "none");
        this.leftInnerArrow.debug = DEBUG;
        this.leftInnerArrow.layer = SCENARIO_LAYER;
        this.leftInnerArrow.addAni("leftInnerArrow", this.getLeftInnerArrowAnimation());
        this.leftInnerArrow.ani.playing = false;

        this.evolutionArrows = new Sprite(75, 324, 46, 68, "none");
        this.evolutionArrows.debug = DEBUG;
        this.evolutionArrows.layer = SCENARIO_LAYER;
        this.evolutionArrows.addAni("evolutionArrows", this.getEvolutionArrowAnimation());
        this.evolutionArrows.ani.playing = false;

        this.restart();
    }

    update(visible) {
        if (this.state === RED_FIELD_ARROW_STATE.NORMAL) {
            this.blinkCaptureArrows(visible);
            this.blinkEvolutionArrows(visible);
            this.blinkBellsproutArrow(visible);
            this.blinkCaveArrow(visible);
            this.blinkLeftInnerArrow(visible);
        } else if (this.state === RED_FIELD_ARROW_STATE.TRAVEL_LEFT) {
            this.blinkTravelLeftArrows(visible);
        } else if (this.state === RED_FIELD_ARROW_STATE.TRAVEL_RIGHT) {
            this.blinkTravelRightArrows(visible);
        } else if (this.state === RED_FIELD_ARROW_STATE.TRAVEL_CAVE) {
            this.blinkTravelCaveArrows(visible);
        }
    }

    blinkCaptureArrows(visible) {
        if (visible) {
            if (this.captureArrowsLevel < 3) {
                frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                    this.captureArrows.ani.frame = this.captureArrowsLevel :
                    this.captureArrows.ani.frame = this.captureArrowsLevel + 1;
            }else{
                this.captureArrows.ani.frame = this.captureArrowsLevel;
            }
        } else {
            this.captureArrows.ani.frame = 0;
        }
    }


    blinkLeftInnerArrow(visible) {
        this.leftInnerArrow.ani.frame = 0;
    }


    blinkEvolutionArrows(visible) {
        if (visible) {
            if (this.evolutionArrowsLevel < 4) {
                frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                    this.evolutionArrows.ani.frame = this.evolutionArrowsLevel :
                    this.evolutionArrows.ani.frame = this.evolutionArrowsLevel + 1;
            }
        } else {
            this.evolutionArrows.ani.frame = 0;
        }
    }

    blinkBellsproutArrow(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.rightInnerArrow.ani.frame = 0 :
                this.rightInnerArrow.ani.frame = (this.captureArrowsLevel >= 2 ? 1 : 0);
        } else {
            this.rightInnerArrow.ani.frame = 0;
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

    upgradeEvolutionArrows() {
        if (this.evolutionArrowsLevel < 3) {
            this.evolutionArrowsLevel++;
            this.evolutionArrows.ani.frame = this.evolutionArrowsLevel;
        }
    }

    setEvolutionArrowsLevel(level) {
        this.evolutionArrowsLevel = level;
        this.evolutionArrows.ani.frame = this.evolutionArrowsLevel;
    }


    resetEvolutionArrows() {
        this.setEvolutionArrowsLevel(0);
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

        this.rightInnerArrow.ani.frame = 0;
        this.captureArrows.ani.frame = 0;
        this.caveArrow.ani.frame = 0;
    }

    blinkTravelRightArrows(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.rightInnerArrow.ani.frame = 0 :
                this.rightInnerArrow.ani.frame = 1;
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.captureArrows.ani.frame = 0 :
                this.captureArrows.ani.frame = 1;
        } else {
            this.rightInnerArrow.ani.frame = 0;
            this.captureArrows.ani.frame = 0;
        }


        this.evolutionArrows.ani.frame = 0;
        this.leftInnerArrow.ani.frame = 0;
        this.caveArrow.ani.frame = 0;
    }

    blinkTravelCaveArrows(visible) {
        if (visible) {
            frameCount % RED_FIELD_ARROWS_BLINK_RATE > RED_FIELD_ARROWS_BLINK_HALF_RATE ?
                this.caveArrow.ani.frame = 0 :
                this.caveArrow.ani.frame = 1;
        } else {
            this.caveArrow.ani.frame = 0;
        }
    }

    getState() {
        return {
            captureArrowsLevel: this.captureArrowsLevel,
            evolutionArrowsLevel: this.evolutionArrowsLevel
        };
    }

    setState(state) {
        this.setCaptureArrowsLevel(state.captureArrowsLevel);
        this.setEvolutionArrowsLevel(state.evolutionArrowsLevel);
    }


    setTravel(direction) {
        if (direction === TRAVEL_DIRECTION.LEFT) {
            this.state = RED_FIELD_ARROW_STATE.TRAVEL_LEFT;
        } else if (direction === TRAVEL_DIRECTION.RIGHT) {
            this.state = RED_FIELD_ARROW_STATE.TRAVEL_RIGHT;
        } else if (direction === TRAVEL_DIRECTION.CAVE) {
            this.state = RED_FIELD_ARROW_STATE.TRAVEL_CAVE;
        }
    }

    resetFromTravel() {
        this.state = RED_FIELD_ARROW_STATE.NORMAL;
    }

    restart() {
        this.setCaptureArrowsLevel(2);
        this.setEvolutionArrowsLevel(0);
        this.state = RED_FIELD_ARROW_STATE.NORMAL;
    }

    getCaveArrowAnimation(){}
    getCaptureArrowAnimation(){}
    getRightInnerArrowAnimation(){}
    getEvolutionArrowAnimation(){}
    getLeftInnerArrowAnimation(){}

}