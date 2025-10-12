const SCREEN_STATE = {
    LANDSCAPE: "landscape",
    CAPTURE: "capture"
}

const RED_LANDMARKS = {
    PALLET: { index: "Area1-0", text: "pallet_town" },
    VIRIDIAN: { index: "Area1-1", text: "viridian_forest" },
    PEWTER: { index: "Area1-2", text: "pewter_city" },
    CERULEAN: { index: "Area1-3", text: "cerulean_city" },
    VERMILION_PORT: { index: "Area1-4", text: "vermilion_city_port" },
    ROCK_TUNNEL: { index: "Area1-5", text: "rock_tunnel" },
    LAVENDER: { index: "Area1-6", text: "lavender_town" },
    BIKE_ROAD: { index: "Area2-0", text: "bike_road" },
    SAFARI: { index: "Area2-1", text: "safari_zone" },
    SEAFOAM: { index: "Area2-2", text: "seafoam_islands" },
    CINNABAR: { index: "Area2-3", text: "cinnabar_island" },
    INDIGO_PLATEAU: { index: "Area3-0", text: "indigo_plateau" }
}

const AREA_MAP = {
    0: "Area1",
    1: "Area1",
    2: "Area1",
    3: "Area2",
    4: "Area2",
    5: "Area3",
}

class Screen {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.area = 0;

        this.state = SCREEN_STATE.LANDSCAPE;

        this.sprite.addAnimation('Area1', Asset.getAnimation('redArea1Landmarks'));
        this.sprite.addAnimation('Area1BW', Asset.getAnimation('redArea1LandmarksBW'));
        this.sprite.addAnimation('Area2', Asset.getAnimation('redArea2Landmarks'));
        this.sprite.addAnimation('Area2BW', Asset.getAnimation('redArea2LandmarksBW'));
        this.sprite.addAnimation('Area3', Asset.getAnimation('Area3Landmarks'));
        this.sprite.addAnimation('Area3BW', Asset.getAnimation('Area3LandmarksBW'));


        //TODO loop this shit
        this.hideSprite = new Sprite(160, 364, 96, 64, "none");
        this.hideSprite.addAnimation('001-bw', Asset.getAnimation('001-bw'));
        this.hideSprite.layer = SCENARIO_LAYER + 1;
        this.hideSprite.visible = false;
        this.hideSprite.draw = this.hideSpriteDraw;
        this.hideSprite.hideLevel = 0;

        this.spinBW();
    }

    update() {
        this.playSpinSound();
    }

    playSpinSound() {
        if (this._lastFrame !== this.sprite.ani.frame) {
            Audio.playSFX('sfx48');
            this._lastFrame = this.sprite.ani.frame;
        }
    }

    spinBW() {
        this.sprite.changeAnimation(AREA_MAP[this.area] + 'BW');
    }

    stopSpin() {
        let currentFrame = this.sprite.animation.frame;
        this.sprite.changeAnimation(AREA_MAP[this.area]);
        this.sprite.animation.stop();
        this.sprite.animation.frame = currentFrame;
        this.currentLandmark = this.landmarkFromIndex(currentFrame);
    }

    landmarkFromIndex(i) {
        for (const key in RED_LANDMARKS) {
            if (RED_LANDMARKS[key].index === `${AREA_MAP[this.area]}-${i}`) {
                return RED_LANDMARKS[key];
            }
        }
        return undefined;
    }

    getLandmarkText() {
        return this.currentLandmark ? I18NManager.translate(this.currentLandmark.text) : "";
    }

    progressArea() {
        this.area = (this.area + 1) % 6;
    }

    startCapture(num) {
        this.state = SCREEN_STATE.CAPTURE;
        this.hideSprite.changeAnimation(num + '-bw');
        this.hideSprite.visible = true;
    }

    flipCapture() {
        if (this.state !== SCREEN_STATE.CAPTURE) return;

        this.hideSprite.hideLevel++;
    }

    hideSpriteDraw() {
        push();

        drawingContext.save();
        drawingContext.beginPath();

        if (this.hideLevel < 6) {
            drawingContext.rect(this.width / 6, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 5) {
            drawingContext.rect(-this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 4) {
            drawingContext.rect(-this.width / 2, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 3) {
            drawingContext.rect(this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 2) {
            drawingContext.rect(-this.width / 6, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 1) {
            drawingContext.rect(-this.width / 2, -this.height / 2, this.width / 3, this.height / 2);
        }

        drawingContext.clip();

        this.ani.draw(0, 0);

        drawingContext.restore();

        pop();
    }

}