const I18NManager = {
    translations: {
        "en": {
            "gengar_stage_cleared": "gengar stage clear ",
            "end_gengar_stage": " end gengar stage ",
            "meowth_stage_cleared": "meowth stage clear ",
            "end_meowth_stage": " end meowth stage ",
            "diglett_stage_cleared": "end diglett stage",
            "end_diglett_stage": " end diglett stage "
        }
    },

    currentLanguage: "en",

    setLanguage(lang) {
        const shortLang = lang.split('-')[0];
        this.currentLanguage = this.translations[shortLang] ? shortLang : "en";
    },

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
};
