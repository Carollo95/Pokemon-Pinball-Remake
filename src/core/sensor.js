import {POINTS} from "./points.js";

import {EngineUtils, SCENARIO_LAYER} from "../engine/engine.js";
import {DEBUG} from "../engine/cheatEngine.js";

export class Sensor {
    constructor(x, y, callback) {
        this.sprite = new Sprite(x, y, 4, 4, "none");
        this.sprite.visible = false;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.debug = DEBUG;
        this.callback = callback;
    }


    update(ballSprite) {
        if (this.sprite.overlaps(ballSprite)) {
            EngineUtils.addPointsForBallHelper(POINTS.PASS_THROUGH_SWITCH);
            this.callback();
        }
    }

}
