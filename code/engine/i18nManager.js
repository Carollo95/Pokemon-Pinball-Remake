const I18NManager = {
    translations: {
        "en": {
            "gengar_stage_cleared": "gengar stage clear ",
            "end_gengar_stage": " end gengar stage ",
            "meowth_stage_cleared": "meowth stage clear ",
            "end_meowth_stage": " end meowth stage ",
            "diglett_stage_cleared": "diglett stage clear",
            "end_diglett_stage": " end diglett stage ",
            "seal_stage_cleared": "    seal stage clear ",
            "end_seal_stage": "   end seal stage  "
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
