const I18N_DEFAULT_LANGUAGE = "en";

const I18NManager = {
    currentTranslations: {},
    currentLanguage: I18N_DEFAULT_LANGUAGE,

    getLanguageFilePath(lang) {
        return `assets/text/${lang}.json`;
    },

    loadLanguageFile(lang) {
        const request = new XMLHttpRequest();

        try {
            request.open("GET", this.getLanguageFilePath(lang), false);
            request.send(null);

            if ((request.status >= 200 && request.status < 300) || request.status === 0) {
                this.currentTranslations = JSON.parse(request.responseText);
                return true;
            }
        } catch (error) {
            return false;
        }

        return false;
    },

    setLanguage(lang) {
        const shortLang = this.normalizeLanguage(lang);

        //TODO add more languages and remove this hardcoded check
        this.currentLanguage = shortLang === "en" ? "en" : I18N_DEFAULT_LANGUAGE;

        this.currentTranslations = {};

        if (!this.loadLanguageFile(this.currentLanguage)) {
            console.error(`Failed to load language file for ${this.currentLanguage}, falling back to default language.`);
        }
    },

    normalizeLanguage(lang) {
        if (!lang || typeof lang !== "string") {
            return I18N_DEFAULT_LANGUAGE;
        }

        return lang.split("-")[0].toLowerCase();
    },

    translate(key) {
        return this.currentTranslations[key] || key;
    }
};
