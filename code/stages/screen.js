const RED_LANDMARKS = {
    PALLET: { index: 0 },
    VIRIDIAN: { index: 1 },
    PEWTER: { index: 2 },
    CERULEAN: { index: 3 },
    VERMILION_PORT: { index: 4 },
    ROCK_TUNNEL: { index: 5 },
    LAVENDER: { index: 6 },
    BIKE_ROAD: { index: 7 },
    SAFARI: { index: 8 },
    SEAFOAM: { index: 9 },
    CINNABAR: { index: 10 },
    INDIGO_PLATEAU: { index: 11 }
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

}