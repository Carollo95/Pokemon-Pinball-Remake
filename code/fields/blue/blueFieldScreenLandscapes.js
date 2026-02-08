const BLUE_LANDMARKS = {
    VIRIDIAN_CITY: {
        index: "Area1-0",
        text: "viridian_city",
        normal: [
            { pokemon: POKEDEX.BULBASAUR, probability: 6.25 },
            { pokemon: POKEDEX.SQUIRTLE, probability: 31.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.NIDORAN_F, probability: 18.75 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 18.75 },
            { pokemon: POKEDEX.POLIWAG, probability: 6.25 },
            { pokemon: POKEDEX.TENTACOOL, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.BULBASAUR, probability: 18.75 },
            { pokemon: POKEDEX.SQUIRTLE, probability: 6.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 12.5 },
            { pokemon: POKEDEX.NIDORAN_F, probability: 12.5 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 12.5 },
            { pokemon: POKEDEX.POLIWAG, probability: 12.5 },
            { pokemon: POKEDEX.TENTACOOL, probability: 12.5 },
            { pokemon: POKEDEX.GOLDEEN, probability: 12.5 }
        ]
    },
    VIRIDIAN: {
        index: "Area1-1",
        text: "viridian_forest",
        normal: [
            { pokemon: POKEDEX.CATERPIE, probability: 31.25 },
            { pokemon: POKEDEX.PIDGEY, probability: 31.25 },
            { pokemon: POKEDEX.RATTATA, probability: 31.25 },
            { pokemon: POKEDEX.PIKACHU, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.CATERPIE, probability: 18.75 },
            { pokemon: POKEDEX.WEEDLE, probability: 12.5 },
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.RATTATA, probability: 12.5 },
            { pokemon: POKEDEX.PIKACHU, probability: 43.75 }
        ]
    },
    MT_MOON: {
        index: "Area1-2",
        text: "mt_moon",
        normal: [
            { pokemon: POKEDEX.RATTATA, probability: 6.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 12.5 },
            { pokemon: POKEDEX.EKANS, probability: 12.5 },
            { pokemon: POKEDEX.SANDSHREW, probability: 12.5 },
            { pokemon: POKEDEX.ZUBAT, probability: 12.5 },
            { pokemon: POKEDEX.PARAS, probability: 12.5 },
            { pokemon: POKEDEX.PSYDUCK, probability: 6.25 },
            { pokemon: POKEDEX.GEODUDE, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.EKANS, probability: 12.5 },
            { pokemon: POKEDEX.SANDSHREW, probability: 12.5 },
            { pokemon: POKEDEX.CLEFAIRY, probability: 37.5 },
            { pokemon: POKEDEX.ZUBAT, probability: 12.5 },
            { pokemon: POKEDEX.PARAS, probability: 12.5 },
            { pokemon: POKEDEX.GEODUDE, probability: 12.5 }
        ]
    },
    CERULEAN: {
        index: "Area1-3",
        text: "cerulean_city",
        normal: [
            { pokemon: POKEDEX.CATERPIE, probability: 12.5 },
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.MEOWTH, probability: 18.75 },
            { pokemon: POKEDEX.PSYDUCK, probability: 6.25 },
            { pokemon: POKEDEX.ABRA, probability: 12.5 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 31.25 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 }
        ],
        rare: [
            { pokemon: POKEDEX.WEEDLE, probability: 6.25 },
            { pokemon: POKEDEX.NIDORAN_M, probability: 6.25 },
            { pokemon: POKEDEX.MEOWTH, probability: 12.5 },
            { pokemon: POKEDEX.PSYDUCK, probability: 12.5 },
            { pokemon: POKEDEX.ABRA, probability: 18.75 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 6.25 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.GOLDEEN, probability: 12.5 },
            { pokemon: POKEDEX.JYNX, probability: 18.75 }
        ]
    },
    VERMILION_STREETS: {
        index: "Area1-4",
        text: "vermilion_city_streets",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.SANDSHREW, probability: 12.5 },
            { pokemon: POKEDEX.MEOWTH, probability: 12.5 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 12.5 },
            { pokemon: POKEDEX.SHELLDER, probability: 18.75 },
            { pokemon: POKEDEX.DROWZEE, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 18.75 }
        ],
        rare: [
            { pokemon: POKEDEX.SANDSHREW, probability: 25.0 },
            { pokemon: POKEDEX.MEOWTH, probability: 6.25 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 6.25 },
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
            { pokemon: POKEDEX.SANDSHREW, probability: 12.5 },
            { pokemon: POKEDEX.ZUBAT, probability: 6.25 },
            { pokemon: POKEDEX.DIGLETT, probability: 25.0 },
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
    CELADON: {
        index: "Area1-6",
        text: "celadon_city",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.VULPIX, probability: 12.5 },
            { pokemon: POKEDEX.ODDISH, probability: 12.5 },
            { pokemon: POKEDEX.MEOWTH, probability: 18.75 },
            { pokemon: POKEDEX.MANKEY, probability: 18.75 },
            { pokemon: POKEDEX.GROWLITHE, probability: 12.5 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.CLEFAIRY, probability: 12.5 },
            { pokemon: POKEDEX.ABRA, probability: 12.5 },
            { pokemon: POKEDEX.SCYTHER, probability: 6.25 },
            { pokemon: POKEDEX.PINSIR, probability: 6.25 },
            { pokemon: POKEDEX.EEVEE, probability: 18.75 },
            { pokemon: POKEDEX.PORYGON, probability: 25.0 },
            { pokemon: POKEDEX.DRATINI, probability: 18.75 }
        ]
    },
    FUCHSIA: {
        index: "Area2-0",
        text: "fuchsia_city",
        normal: [
            { pokemon: POKEDEX.VENONAT, probability: 12.5 },
            { pokemon: POKEDEX.KRABBY, probability: 18.75 },
            { pokemon: POKEDEX.EXEGGCUTE, probability: 12.5 },
            { pokemon: POKEDEX.KANGASKHAN, probability: 12.5 },
            { pokemon: POKEDEX.GOLDEEN, probability: 18.75 },
            { pokemon: POKEDEX.MAGIKARP, probability: 25.0 }
        ],
        rare: [
            { pokemon: POKEDEX.VENONAT, probability: 25.0 },
            { pokemon: POKEDEX.KRABBY, probability: 6.25 },
            { pokemon: POKEDEX.EXEGGCUTE, probability: 25.0 },
            { pokemon: POKEDEX.KANGASKHAN, probability: 25.0 },
            { pokemon: POKEDEX.GOLDEEN, probability: 6.25 },
            { pokemon: POKEDEX.MAGIKARP, probability: 12.5 }
        ]
    },
    SAFARI: {
        index: "Area2-1",
        text: "safari_zone",
        normal: [
            { pokemon: POKEDEX.NIDORAN_F, probability: 25.0 },
            { pokemon: POKEDEX.PARAS, probability: 25.0 },
            { pokemon: POKEDEX.DODUO, probability: 25.0 },
            { pokemon: POKEDEX.RHYHORN, probability: 25.0 }
        ],
        rare: [
            { pokemon: POKEDEX.NIDORAN_F, probability: 12.5 },
            { pokemon: POKEDEX.PARAS, probability: 12.5 },
            { pokemon: POKEDEX.RHYHORN, probability: 12.5 },
            { pokemon: POKEDEX.CHANSEY, probability: 25.0 },
            { pokemon: POKEDEX.PINSIR, probability: 12.5 },
            { pokemon: POKEDEX.DRATINI, probability: 12.5 }
        ]
    },
    SAFFRON: {
        index: "Area2-2",
        text: "saffron_city",
        normal: [
            { pokemon: POKEDEX.PIDGEY, probability: 12.5 },
            { pokemon: POKEDEX.EKANS, probability: 18.75 },
            { pokemon: POKEDEX.SANDSHREW, probability: 18.75 },
            { pokemon: POKEDEX.VULPIX, probability: 6.25 },
            { pokemon: POKEDEX.ODDISH, probability: 12.5 },
            { pokemon: POKEDEX.MEOWTH, probability: 6.25 },
            { pokemon: POKEDEX.MANKEY, probability: 6.25 },
            { pokemon: POKEDEX.GROWLITHE, probability: 6.25 },
            { pokemon: POKEDEX.BELLSPROUT, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.PIDGEY, probability: 6.25 },
            { pokemon: POKEDEX.EKANS, probability: 6.25 },
            { pokemon: POKEDEX.SANDSHREW, probability: 6.25 },
            { pokemon: POKEDEX.VULPIX, probability: 6.25 },
            { pokemon: POKEDEX.MEOWTH, probability: 6.25 },
            { pokemon: POKEDEX.MANKEY, probability: 6.25 },
            { pokemon: POKEDEX.GROWLITHE, probability: 6.25 },
            { pokemon: POKEDEX.HITMONLEE, probability: 18.75 },
            { pokemon: POKEDEX.HITMONCHAN, probability: 18.75 },
            { pokemon: POKEDEX.LAPRAS, probability: 18.75 }
        ]
    },
    CINNABAR: {
        index: "Area2-3",
        text: "cinnabar_island",
        normal: [
            { pokemon: POKEDEX.VULPIX, probability: 18.75 },
            { pokemon: POKEDEX.PONYTA, probability: 31.25 },
            { pokemon: POKEDEX.GRIMER, probability: 12.5 },
            { pokemon: POKEDEX.KOFFING, probability: 25.0 },
            { pokemon: POKEDEX.TANGELA, probability: 12.5 }
        ],
        rare: [
            { pokemon: POKEDEX.VULPIX, probability: 6.25 },
            { pokemon: POKEDEX.PONYTA, probability: 12.5 },
            { pokemon: POKEDEX.GRIMER, probability: 12.5 },
            { pokemon: POKEDEX.KOFFING, probability: 12.5 },
            { pokemon: POKEDEX.TANGELA, probability: 18.75 },
            { pokemon: POKEDEX.MAGMAR, probability: 18.75 },
            { pokemon: POKEDEX.AERODACTYL, probability: 18.75 }
        ]
    },
    INDIGO_PLATEAU: {
        index: "Area3-0",
        text: "indigo_plateau",
        normal: [
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.SANDSHREW, probability: 6.25 },
            { pokemon: POKEDEX.ZUBAT, probability: 12.5 },
            { pokemon: POKEDEX.MACHOP, probability: 18.75 },
            { pokemon: POKEDEX.GEODUDE, probability: 18.75 },
            { pokemon: POKEDEX.ONIX, probability: 18.75 },
            { pokemon: POKEDEX.DITTO, probability: 18.75 }
        ],
        rare: [
            { pokemon: POKEDEX.SPEAROW, probability: 6.25 },
            { pokemon: POKEDEX.SANDSHREW, probability: 6.25 },
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

class BlueFieldScreenLandscapes extends ScreenLandscapes {

    constructor() {
        super();
    }

    addAnimations() {
        this.sprite.addAnimation('Area1', Asset.getAnimation('blueArea1Landmarks'));
        this.sprite.addAnimation('Area1BW', Asset.getAnimation('blueArea1LandmarksBW'));
        this.sprite.addAnimation('Area2', Asset.getAnimation('blueArea2Landmarks'));
        this.sprite.addAnimation('Area2BW', Asset.getAnimation('blueArea2LandmarksBW'));
        this.sprite.addAnimation('Area3', Asset.getAnimation('Area3Landmarks'));
        this.sprite.addAnimation('Area3BW', Asset.getAnimation('Area3LandmarksBW'));
    }

    getLandmarks() {
        return BLUE_LANDMARKS;
    }

}