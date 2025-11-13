const RED_LANDMARKS = {
    PALLET: {
        index: "Area1-0",
        text: "pallet_town",
        normal: [
            { pokemon: POKEDEX.BULBASAUR, probability: 6.25 },
            { pokemon: POKEDEX.CHARMANDER, probability: 37.5 },
            { pokemon: POKEDEX.PIDGEY, probability: 18.75 },
            { pokemon: POKEDEX.RATTATA, probability: 18.75 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 6.25 },
            { pokemon: POKEDEX.POLIWAG, probability: 6.25 },
            { pokemon: POKEDEX.TENTACOOL, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.BULBASAUR, probability: 18.75 },
            { pokemon: POKEDEX.CHARMANDER, probability: 6.25 },
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.RATTATA, probability: 6.25 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 18.75 },
            { pokemon: POKEDEX.POLIWAG, probability: 25.00 },
            { pokemon: POKEDEX.TENTACOOL, probability: 18.75 }
        ]
    },
    VIRIDIAN: {
        index: "Area1-1",
        text: "viridian_forest",
        normal: [
            { pokemon: POKEDEX.WEEDLE, probability: 31.25 },
            { pokemon: POKEDEX.PIDGEY, probability: 31.25 },
            { pokemon: POKEDEX.RATTATA, probability: 31.25 },
            { pokemon: POKEDEX.PIKACHU, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.CATERPIE, probability: 12.5 },
            { pokemon: POKEDEX.WEEDLE, probability: 18.75 },
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.RATTATA, probability: 12.5 },
            { pokemon: POKEDEX.PIKACHU, probability: 43.75 }
        ]
    },
    PEWTER: {
        index: "Area1-2",
        text: "pewter_city",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.SPEAROW, probability: 37.5 },
            { pokemon: POKEDEX.EKANS, probability: 6.25 },
            { pokemon: POKEDEX.JIGGLYPUFF, probability: 31.25 },
            { pokemon: POKEDEX.MAGIKARP, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.SPEAROW, probability: 18.75 },
            { pokemon: POKEDEX.EKANS, probability: 25.00 },
            { pokemon: POKEDEX.JIGGLYPUFF, probability: 18.75 },
            { pokemon: POKEDEX.MAGIKARP, probability: 25.00 }
        ]
    },
    CERULEAN: {
        index: "Area1-3",
        text: "cerulean_city",
        normal: [
            { pokemon: POKEDEX.WEEDLE, probability: 12.5 },
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.ODDISH, probability: 31.25 },
            { pokemon: POKEDEX.PSYDUCK, probability: 6.25 },
            { pokemon: POKEDEX.MANKEY, probability: 18.75 },
            { pokemon: POKEDEX.ABRA, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.CATERPIE, probability: 6.25 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 6.25 },
            { pokemon: POKEDEX.ODDISH, probability: 6.25 },
            { pokemon: POKEDEX.PSYDUCK, probability: 12.5 },
            { pokemon: POKEDEX.MANKEY, probability: 12.5 },
            { pokemon: POKEDEX.ABRA, probability: 18.75 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 12.5 },
            { pokemon: POKEDEX.JYNX, probability: 18.75 }
        ]
    },
    VERMILION_SEASIDE: {
        index: "Area1-4",
        text: "vermilion_city_seaside",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.EKANS, probability: 12.5 },
            { pokemon: POKEDEX.ODDISH, probability: 12.5 },
            { pokemon: POKEDEX.MANKEY, probability: 12.5 },
            { pokemon: POKEDEX.SHELLDER, probability: 18.75 },
            { pokemon: POKEDEX.DROWZEE, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 18.75 }
        ],
        rare: [
            { pokemon: POKEDEX.EKANS, probability: 25.0 },
            { pokemon: POKEDEX.ODDISH, probability: 6.25 },
            { pokemon: POKEDEX.MANKEY, probability: 6.25 },
            { pokemon: POKEDEX.FARFETCHD, probability: 25.0 },
            { pokemon: POKEDEX.SHELLDER, probability: 12.5 },
            { pokemon: POKEDEX.DROWZEE, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 12.5 }
        ]
    },
    ROCK_MOUNTAIN: {
        index: "Area1-5",
        text: "rock_mountain",
        normal: [
            { pokemon: POKEDEX.RATTATA, probability: 6.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.EKANS, probability: 18.75 },
            { pokemon: POKEDEX.ZUBAT, probability: 6.25 },
            { pokemon: POKEDEX.DIGLETT, probability: 18.75 },
            { pokemon: POKEDEX.MACHOP, probability: 6.25 },
            { pokemon: POKEDEX.GEODUDE, probability: 6.25 },
            { pokemon: POKEDEX.SLOWPOKE, probability: 6.25 },
            { pokemon: POKEDEX.ONIX, probability: 6.25 },
            { pokemon: POKEDEX.VOLTORB, probability: 18.75 }
        ],
        rare: [
            { pokemon: POKEDEX.ZUBAT, probability: 12.5 },
            { pokemon: POKEDEX.DIGLETT, probability: 6.25 },
            { pokemon: POKEDEX.MACHOP, probability: 12.5 },
            { pokemon: POKEDEX.GEODUDE, probability: 12.5 },
            { pokemon: POKEDEX.SLOWPOKE, probability: 12.5 },
            { pokemon: POKEDEX.ONIX, probability: 12.5 },
            { pokemon: POKEDEX.VOLTORB, probability: 12.5 },
            { pokemon: POKEDEX.MR_MIME, probability: 18.75 }
        ]
    },
    LAVENDER: {
        index: "Area1-6",
        text: "lavender_town",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.EKANS, probability: 12.5 },
            { pokemon: POKEDEX.MANKEY, probability: 12.5 },
            { pokemon: POKEDEX.GROWLITHE, probability: 12.5 },
            { pokemon: POKEDEX.MAGNEMITE, probability: 12.5 },
            { pokemon: POKEDEX.GASTLY, probability: 31.25 },
            { pokemon: POKEDEX.CUBONE, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.EKANS, probability: 6.25 },
            { pokemon: POKEDEX.MANKEY, probability: 6.25 },
            { pokemon: POKEDEX.GROWLITHE, probability: 6.25 },
            { pokemon: POKEDEX.MAGNEMITE, probability: 12.5 },
            { pokemon: POKEDEX.GASTLY, probability: 12.5 },
            { pokemon: POKEDEX.CUBONE, probability: 18.75 },
            { pokemon: POKEDEX.ELECTABUZZ, probability: 18.75 },
            { pokemon: POKEDEX.ZAPDOS, probability: 18.75 }
        ]
    },
    BIKE_ROAD: {
        index: "Area2-0",
        text: "bike_road",
        normal: [
            { pokemon: POKEDEX.RATTATA, probability: 12.5 },
            { pokemon: POKEDEX.SPEAROW, probability: 12.5 },
            { pokemon: POKEDEX.TENTACOOL, probability: 12.5 },
            { pokemon: POKEDEX.DODUO, probability: 18.75 },
            { pokemon: POKEDEX.KRABBY, probability: 12.5 },
            { pokemon: POKEDEX.LICKITUNG, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 12.5 },
            { pokemon: POKEDEX.MAGIKARP, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.TENTACOOL, probability: 6.25 },
            { pokemon: POKEDEX.DODUO, probability: 31.25 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.LICKITUNG, probability: 25.0 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 },
            { pokemon: POKEDEX.MAGIKARP, probability: 6.25 },
            { pokemon: POKEDEX.SNORLAX, probability: 18.75 }
        ]
    },
    SAFARI: {
        index: "Area2-1",
        text: "safari_zone",
        normal: [
            { pokemon: POKEDEX.NIDORAN_M, probability: 25.0 },
            { pokemon: POKEDEX.PARAS, probability: 25.0 },
            { pokemon: POKEDEX.DODUO, probability: 25.0 },
            { pokemon: POKEDEX.RHYHORN, probability: 25.0 }
        ],
        rare: [
            { pokemon: POKEDEX.NIDORAN_M, probability: 12.5 },
            { pokemon: POKEDEX.PARAS, probability: 12.5 },
            { pokemon: POKEDEX.RHYHORN, probability: 12.5 },
            { pokemon: POKEDEX.CHANSEY, probability: 25.0 },
            { pokemon: POKEDEX.SCYTHER, probability: 12.5 },
            { pokemon: POKEDEX.TAUROS, probability: 12.5 },
            { pokemon: POKEDEX.DRATINI, probability: 12.5 }
        ]
    },
    SEAFOAM: {
        index: "Area2-2",
        text: "seafoam_islands",
        normal: [
            { pokemon: POKEDEX.ZUBAT, probability: 6.25 },
            { pokemon: POKEDEX.PSYDUCK, probability: 6.25 },
            { pokemon: POKEDEX.TENTACOOL, probability: 6.25 },
            { pokemon: POKEDEX.SLOWPOKE, probability: 6.25 },
            { pokemon: POKEDEX.SEEL, probability: 6.25 },
            { pokemon: POKEDEX.SHELLDER, probability: 6.25 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.HORSEA, probability: 25.0 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 },
            { pokemon: POKEDEX.STARYU, probability: 25.0 }
        ],
        rare: [
            { pokemon: POKEDEX.SEEL, probability: 31.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 25.0 },
            { pokemon: POKEDEX.STARYU, probability: 25.0 },
            { pokemon: POKEDEX.ARTICUNO, probability: 18.75 }
        ]
    },
    CINNABAR: {
        index: "Area2-3",
        text: "cinnabar_island",
        normal: [
            { pokemon: POKEDEX.GROWLITHE, probability: 25.0 },
            { pokemon: POKEDEX.PONYTA, probability: 25.0 },
            { pokemon: POKEDEX.GRIMER, probability: 12.5 },
            { pokemon: POKEDEX.KOFFING, probability: 25.0 },
            { pokemon: POKEDEX.TANGELA, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.GROWLITHE, probability: 12.5 },
            { pokemon: POKEDEX.PONYTA, probability: 12.5 },
            { pokemon: POKEDEX.GRIMER, probability: 6.25 },
            { pokemon: POKEDEX.KOFFING, probability: 12.5 },
            { pokemon: POKEDEX.TANGELA, probability: 18.75 },
            { pokemon: POKEDEX.OMANYTE, probability: 18.75 },
            { pokemon: POKEDEX.KABUTO, probability: 18.75 }
        ]
    },
    INDIGO_PLATEAU: {
        index: "Area3-0",
        text: "indigo_plateau",
        normal: [
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.EKANS, probability: 6.25 },
            { pokemon: POKEDEX.ZUBAT, probability: 12.5 },
            { pokemon: POKEDEX.MACHOP, probability: 18.75 },
            { pokemon: POKEDEX.GEODUDE, probability: 18.75 },
            { pokemon: POKEDEX.ONIX, probability: 18.75 },
            { pokemon: POKEDEX.DITTO, probability: 18.75 }
        ],
        rare: [
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.EKANS, probability: 6.25 },
            { pokemon: POKEDEX.ZUBAT, probability: 6.25 },
            { pokemon: POKEDEX.MACHOP, probability: 6.25 },
            { pokemon: POKEDEX.GEODUDE, probability: 6.25 },
            { pokemon: POKEDEX.ONIX, probability: 6.25 },
            { pokemon: POKEDEX.DITTO, probability: 25.0 },
            { pokemon: POKEDEX.MOLTRES, probability: 18.75 },
            { pokemon: POKEDEX.MEWTWO, probability: 18.75 }
        ]
    }
}

//TODO missing mew

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

        this.sprite.addAnimation('Area1', Asset.getAnimation('redArea1Landmarks'));
        this.sprite.addAnimation('Area1BW', Asset.getAnimation('redArea1LandmarksBW'));
        this.sprite.addAnimation('Area2', Asset.getAnimation('redArea2Landmarks'));
        this.sprite.addAnimation('Area2BW', Asset.getAnimation('redArea2LandmarksBW'));
        this.sprite.addAnimation('Area3', Asset.getAnimation('Area3Landmarks'));
        this.sprite.addAnimation('Area3BW', Asset.getAnimation('Area3LandmarksBW'));

        this.spinBW();
    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update() {
        //TODO why?
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


    landmarkFromAreaAndLocation(area, location) {
        for (const key in RED_LANDMARKS) {
            if (RED_LANDMARKS[key].index === `${AREA_MAP[area]}-${location}`) {
                return RED_LANDMARKS[key];
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
        this.currentLandmark = this.landmarkFromAreaAndLocation(AREA_MAP[area], location);
        this.sprite.changeAnimation(AREA_MAP[area]);
        this.sprite.animation.stop();
        this.sprite.animation.frame = location;
    }


}