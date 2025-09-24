const RED_LANDMARKS = {
    PALLET: { index: 0, text: "pallet_town" },
    VIRIDIAN: { index: 1, text: "viridian_forest" },
    PEWTER: { index: 2, text: "pewter_city" },
    CERULEAN: { index: 3, text: "cerulean_city" },
    VERMILION_PORT: { index: 4, text: "vermilion_city_port" },
    ROCK_TUNNEL: { index: 5, text: "rock_tunnel" },
    LAVENDER: { index: 6, text: "lavender_town" },
    BIKE_ROAD: { index: 7, text: "bike_road" },
    SAFARI: { index: 8, text: "safari_zone" },
    SEAFOAM: { index: 9, text: "seafoam_islands" },
    CINNABAR: { index: 10, text: "cinnabar_island" },
    INDIGO_PLATEAU: { index: 11, text: "indigo_plateau" }
}

class Screen {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('redLandmarks', Asset.getAnimation('redLandmarks'));
        this.sprite.addAnimation('redLandmarksBW', Asset.getAnimation('redLandmarksBW'));

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
        this.sprite.changeAnimation('redLandmarksBW');
    }

    stopSpin() {
        let currentFrame = this.sprite.animation.frame;
        this.sprite.changeAnimation('redLandmarks');
        this.sprite.animation.stop();
        this.sprite.animation.frame = currentFrame;
        this.currentLandmark = this.landmarkFromIndex(currentFrame);
    }

    landmarkFromIndex(i) {
        for (const key in RED_LANDMARKS) {
            if (RED_LANDMARKS[key].index === i) {
                return RED_LANDMARKS[key];
            }
        }
        return undefined;
    }

    getLandmarkText() {
        return this.currentLandmark ? I18NManager.translate(this.currentLandmark.text) : "";
    }

}