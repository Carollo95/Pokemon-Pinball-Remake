const I18NManager = {
    translations: {
        "en": {
            "gengar_stage_clear": "gengar stage cleared",
            "end_gengar_stage": " end gengar stage ",
            "meowth_stage_clear": "meowth stage cleared",
            "end_meowth_stage": " end meowth stage ",
            "diglett_stage_clear": "diglett stage cleared",
            "end_diglett_stage": " end diglett stage ",
            "seal_stage_clear": "  seal stage cleared ",
            "end_seal_stage": "   end seal stage  ",
            "mewtwo_stage_clear": "mewtwo stage cleared",
            "end_mewtwo_stage": "end mewtwo stage  ",

            "start_from": "start from: ",
            "pallet_town": "pallet town",
            "viridian_forest": "viridian forest",
            "pewter_city": "pewter city",
            "cerulean_city": "cerulean city",
            "vermilion_city_port": "vermilion city: port",
            "rock_tunnel": "rock tunnel",
            "lavender_town": "lavender town",
            "bike_road": "bike road",
            "safari_zone": "safari zone",
            "seafoam_islands": "seafoam islands",
            "cinnabar_island": "cinnabar island",
            "indigo_plateau": "indigo plateau",

            "end_of_ball_bonus": " end of ball bonus   ",
            "bonus": " bonus        ",
            "subtotal": " subtotal     ",
            "total": " total    ",
            "score": " score    ",
            "multiplier": " multiplier         ",
            "pokemon_caught": "pokémon caught",
            "pokemon_evolved": "pokémon evolved",
            "cave_shots": "cave shots",
            "spinner_turns": "spinner turns",
            "bellsprout": "bellsprout",
            "dugtrio": "dugtrio",
        }
    },

    currentLanguage: "en",

    setLanguage(lang) {
        const shortLang = lang.split('-')[0];
        this.currentLanguage = this.translations[shortLang] ? shortLang : "en";
    },

    translate(key) {
        return (
            this.translations[this.currentLanguage][key] ||
            this.translations["en"][key] ||
            key
        );
    }
};
