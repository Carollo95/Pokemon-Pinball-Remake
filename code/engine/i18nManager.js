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
            "end_mewtwo_stage": "end mewtwo stage  "
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
