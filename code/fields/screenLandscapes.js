

const AREA_MAP = {
    0: "Area1",
    1: "Area1",
    2: "Area1",
    3: "Area2",
    4: "Area2",
    5: "Area3",
}

class ScreenLandscapes {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.area = 0;

        this.addAnimations();

        this.spinBW();
    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update() {
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
        for (const key in this.getLandmarks()) {
            if (this.getLandmarks()[key].index === `${AREA_MAP[this.area]}-${i}`) {
                return this.getLandmarks()[key];
            }
        }
        return undefined;
    }


    landmarkFromAreaAndLocation(area, location) {
        for (const key in this.getLandmarks()) {
            if (this.getLandmarks()[key].index === `${AREA_MAP[area]}-${location}`) {
                return this.getLandmarks()[key];
            }
        }
        return undefined;
    }

    getPokemonFromLandmark(level) {
        const rand = parseFloat((Math.random() * 100).toFixed(2));
        let pool = [];
        let acc = 0;
        if (level === 2) {
            pool = this.currentLandmark.normal;
        } else if (level > 2) {
            pool = this.currentLandmark.rare;
        }

        for (let i = 0; i < pool.length; i++) {
            acc += pool[i].probability;
            if (rand <= acc) {
                return pool[i].pokemon;
            }
        }
    }

    getLandmarkText() {
        return this.currentLandmark ? I18NManager.translate(this.currentLandmark.text) : "";
    }

    progressLandmark() {
        this.area = (this.area + 1) % 6;
        let newIndexOnArea;
        if (AREA_MAP[this.area].endsWith(1)) {
            newIndexOnArea = this.getNextLandmarkOnArea(this.sprite.animation.frame, 7);
        } else if (AREA_MAP[this.area].endsWith(2)) {
            newIndexOnArea = this.getNextLandmarkOnArea(this.sprite.animation.frame, 4);
        } else {
            newIndexOnArea = this.getNextLandmarkOnArea(this.sprite.animation.frame, 1);
        }

        this.goTo(this.area, newIndexOnArea);
    }

    getNextLandmarkOnArea(currentLandmark = 0, landmarksOnCurrentArea = 0) {
        const total = Math.max(1, (landmarksOnCurrentArea));
        if (total === 1) return 0;

        const options = Array.from({ length: total }, (_, i) => i).filter(n => n !== currentLandmark);
        if (options.length === 0) return 0;

        return random(options);
    }

    setLandmarkFromIndex(landmark) {
        let parsed = landmark.index.replace("Area", "").split("-");
        const area = parseInt(parsed[0]);
        const location = parseInt(parsed[1]);
        this.setLandmark(area, location);
    }

    setLandmark(area, location) {
        this.area = area;
        this.goTo(this.area, location)
    }

    goTo(area, location) {
        this.currentLandmark = this.landmarkFromAreaAndLocation(area, location);
        this.sprite.changeAnimation(AREA_MAP[area]);
        this.sprite.animation.stop();
        this.sprite.animation.frame = location;
        //This prevents sound on the first frame
        this._lastFrame = this.sprite.animation.frame;
    }


}